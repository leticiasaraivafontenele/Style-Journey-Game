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

const RESPONSE_SCHEMA = {
  type: "OBJECT",
  properties: {
    quality: { type: "INTEGER" },
    evaluation: { type: "STRING" },
  },
  required: ["quality", "evaluation"],
  propertyOrdering: ["quality", "evaluation"],
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
    if (!aiConfig.geminiApiKey) {
      console.warn("GEMINI_API_KEY not set — AI evaluation will fail until configured.");
      return;
    }
    console.log(`Gemini model "${aiConfig.model}" configured and ready.`);
  }

  async evaluate(challenge: ChallengeContext, userSolution: string): Promise<AiEvaluation> {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), aiConfig.timeoutMs);

    let response: Response;
    try {
      response = await fetch(`${aiConfig.geminiUrl}/models/${aiConfig.model}:generateContent`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": aiConfig.geminiApiKey,
        },
        signal: controller.signal,
        body: JSON.stringify({
          system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
          contents: [
            { role: "user", parts: [{ text: buildUserPrompt(challenge, userSolution) }] },
          ],
          generationConfig: {
            temperature: 0.2,
            responseMimeType: "application/json",
            responseSchema: RESPONSE_SCHEMA,
          },
        }),
      });
    } catch (error) {
      console.error("Gemini request failed:", error);
      throw new Error("AI_UNAVAILABLE");
    } finally {
      clearTimeout(timeout);
    }

    if (!response.ok) {
      const errorBody = await response.text().catch(() => "");
      console.error(`Gemini responded with status ${response.status}: ${errorBody}`);
      throw new Error("AI_UNAVAILABLE");
    }

    let content: string;
    try {
      const payload = (await response.json()) as {
        candidates?: { content?: { parts?: { text?: string }[] } }[];
      };
      content = payload.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
    } catch (error) {
      console.error("Failed to read Gemini response body:", error);
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
    console.error("Gemini returned non-JSON content:", rawContent);
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
    console.error("Gemini returned an invalid evaluation shape:", parsed);
    throw new Error("AI_UNAVAILABLE");
  }

  return {
    quality,
    evaluation: evaluation.trim().slice(0, EVALUATION_MAX_LENGTH),
  };
}

export const aiEvaluationService = new AiEvaluationService();
