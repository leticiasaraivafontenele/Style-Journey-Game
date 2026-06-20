import { aiConfig } from "../config/database.js";

export interface ChallengeContext {
  property: string;
  description: string;
  instructions: string;
  solution: string;
  html?: string;
}

export interface AiEvaluation {
  quality: 1 | 2 | 3;
  evaluation: string;
}

const EVALUATION_MAX_LENGTH = 300;

const RESPONSE_FORMAT = {
  type: "object",
  properties: {
    quality: { type: "integer", enum: [1, 2, 3] },
    evaluation: { type: "string" },
  },
  required: ["quality", "evaluation"],
} as const;

const SYSTEM_PROMPT = `Você é um avaliador especialista em CSS de uma plataforma gamificada de ensino.
Avalie a QUALIDADE da resposta de um aluno seguindo a documentação oficial (MDN/W3C) e as boas práticas de CSS.
A resposta do aluno JÁ está visualmente correta (resolve o desafio); não julgue se acerta, julgue a qualidade.
Como em CSS há várias formas de obter o mesmo resultado, considere clareza, eficiência, especificidade e boas práticas.

Classifique "quality" exatamente assim:
1 = resolve o desafio, porém bem fora das boas práticas e pouco eficaz.
2 = resolve e já é suficientemente eficaz, mas poderia melhorar em boas práticas.
3 = resposta muito boa, idiomática e alinhada às boas práticas.

"evaluation": resumo em português do Brasil, em linguagem humana e didática, dirigido ao aluno,
explicando de forma clara o porquê da nota. No máximo ${EVALUATION_MAX_LENGTH} caracteres.

Responda APENAS com um JSON no formato {"quality": number, "evaluation": string}.`;

function stripPhaseTokens(text: string): string {
  return text
    .replace(/##/g, "")
    .replace(/\/n/g, " ")
    .replace(/\/tab/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function buildUserPrompt(challenge: ChallengeContext, userSolution: string): string {
  const lines = [
    `Conceito ensinado: ${stripPhaseTokens(challenge.property)}`,
    `Explicação: ${stripPhaseTokens(challenge.description)}`,
    `Objetivo do desafio: ${stripPhaseTokens(challenge.instructions)}`,
    `Solução canônica de referência: ${challenge.solution}`,
  ];

  if (challenge.html) {
    lines.push(`HTML do desafio:\n${stripPhaseTokens(challenge.html)}`);
  }

  lines.push(`Resposta enviada pelo aluno: ${userSolution}`);
  lines.push("Avalie a qualidade da resposta do aluno.");

  return lines.join("\n");
}

export class AiEvaluationService {

  async warmup(): Promise<void> {
    try {
      const response = await fetch(`${aiConfig.ollamaUrl}/api/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: aiConfig.model, keep_alive: aiConfig.keepAlive }),
      });
      if (response.ok) {
        console.log(`Ollama model "${aiConfig.model}" warmed up and ready.`);
      } else {
        console.warn(`Ollama warmup returned status ${response.status} (model will load on first request).`);
      }
    } catch (error) {
      console.warn(
        "Ollama warmup failed (model will load on first request):",
        error instanceof Error ? error.message : error
      );
    }
  }

  async evaluate(challenge: ChallengeContext, userSolution: string): Promise<AiEvaluation> {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), aiConfig.timeoutMs);

    let response: Response;
    try {
      response = await fetch(`${aiConfig.ollamaUrl}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          model: aiConfig.model,
          stream: false,
          think: false,
          format: RESPONSE_FORMAT,
          keep_alive: aiConfig.keepAlive,
          options: { temperature: 0.2 },
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            { role: "user", content: buildUserPrompt(challenge, userSolution) },
          ],
        }),
      });
    } catch (error) {
      console.error("Ollama request failed:", error);
      throw new Error("AI_UNAVAILABLE");
    } finally {
      clearTimeout(timeout);
    }

    if (!response.ok) {
      console.error(`Ollama responded with status ${response.status}`);
      throw new Error("AI_UNAVAILABLE");
    }

    let content: string;
    try {
      const payload = (await response.json()) as { message?: { content?: string } };
      content = payload.message?.content ?? "";
    } catch (error) {
      console.error("Failed to read Ollama response body:", error);
      throw new Error("AI_UNAVAILABLE");
    }

    return parseEvaluation(content);
  }
}

function parseEvaluation(rawContent: string): AiEvaluation {
  const cleaned = rawContent.replace(/<think>[\s\S]*?<\/think>/g, "").trim();

  let parsed: unknown;
  try {
    parsed = JSON.parse(cleaned);
  } catch (error) {
    console.error("Ollama returned non-JSON content:", rawContent);
    throw new Error("AI_UNAVAILABLE");
  }

  const { quality, evaluation } = (parsed ?? {}) as {
    quality?: unknown;
    evaluation?: unknown;
  };

  if (
    (quality !== 1 && quality !== 2 && quality !== 3) ||
    typeof evaluation !== "string" ||
    evaluation.trim() === ""
  ) {
    console.error("Ollama returned an invalid evaluation shape:", parsed);
    throw new Error("AI_UNAVAILABLE");
  }

  return {
    quality,
    evaluation: evaluation.trim().slice(0, EVALUATION_MAX_LENGTH),
  };
}

export const aiEvaluationService = new AiEvaluationService();
