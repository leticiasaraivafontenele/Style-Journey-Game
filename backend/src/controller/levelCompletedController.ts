import { Request, Response } from "express";
import { levelCompletedService } from "../service/levelCompletedService.js";
import { ChallengeContext } from "../service/aiEvaluationService.js";

interface SaveLevelBody {
  idUser: number;
  level: number;
  userSolution: string;
}

interface EvaluateLevelBody {
  idUser: number;
  level: number;
  userSolution: string;
  challenge: ChallengeContext;
}

export const saveLevelController = async (
  req: Request<{}, {}, SaveLevelBody>,
  res: Response
): Promise<Response> => {
  try {
    const record = await levelCompletedService.saveLevel(req.body);

    return res.status(200).json({
      message: "Level saved successfully!",
      data: record
    });
  } catch (error) {
    if (error instanceof Error && error.message === "MISSING_FIELDS") {
      return res.status(400).json({ message: "idUser, level and userSolution are required." });
    }
    console.error("Error in saveLevelController:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const evaluateLevelController = async (
  req: Request<{}, {}, EvaluateLevelBody>,
  res: Response
): Promise<Response> => {
  try {
    const record = await levelCompletedService.evaluateAndSaveLevel(req.body);

    return res.status(200).json({
      message: "Level evaluated successfully!",
      data: record
    });
  } catch (error) {
    if (error instanceof Error && error.message === "MISSING_FIELDS") {
      return res.status(400).json({ message: "idUser, level, userSolution and challenge are required." });
    }
    if (error instanceof Error && error.message === "AI_UNAVAILABLE") {
      return res.status(503).json({
        message: "Não foi possível avaliar sua resposta agora. Tente novamente em instantes."
      });
    }
    console.error("Error in evaluateLevelController:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getLevelsByUserController = async (
  req: Request<{ idUser: string }>,
  res: Response
): Promise<Response> => {
  try {
    const idUser = parseInt(req.params.idUser);

    if (isNaN(idUser)) {
      return res.status(400).json({ message: "Invalid idUser." });
    }

    const levels = await levelCompletedService.getLevelsByUser(idUser);

    return res.status(200).json({ data: levels });
  } catch (error) {
    console.error("Error in getLevelsByUserController:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getLevelByUserAndLevelController = async (
  req: Request<{ idUser: string; level: string }>,
  res: Response
): Promise<Response> => {
  try {
    const idUser = parseInt(req.params.idUser);
    const level = parseInt(req.params.level);

    if (isNaN(idUser) || isNaN(level)) {
      return res.status(400).json({ message: "Invalid idUser or level." });
    }

    const record = await levelCompletedService.getLevelByUserAndLevel(idUser, level);

    return res.status(200).json({ data: record });
  } catch (error) {
    if (error instanceof Error && error.message === "LEVEL_NOT_FOUND") {
      return res.status(404).json({ message: "Level not found for this user." });
    }
    console.error("Error in getLevelByUserAndLevelController:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateLevelController = async (
  req: Request<{ id: string }, {}, Partial<{ userSolution: string }>>,
  res: Response
): Promise<Response> => {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid id." });
    }

    const record = await levelCompletedService.updateLevel(id, req.body);

    return res.status(200).json({
      message: "Level updated successfully!",
      data: record
    });
  } catch (error) {
    if (error instanceof Error && error.message === "LEVEL_COMPLETED_NOT_FOUND") {
      return res.status(404).json({ message: "Level not found." });
    }
    console.error("Error in updateLevelController:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteLevelController = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<Response> => {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid id." });
    }

    await levelCompletedService.deleteLevel(id);

    return res.status(200).json({ message: "Level deleted successfully!" });
  } catch (error) {
    if (error instanceof Error && error.message === "LEVEL_COMPLETED_NOT_FOUND") {
      return res.status(404).json({ message: "Level not found." });
    }
    console.error("Error in deleteLevelController:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
