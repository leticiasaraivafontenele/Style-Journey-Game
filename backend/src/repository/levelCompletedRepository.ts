import { LevelCompleted } from "../db/dbconnetion.js";
import { LevelCompletedInstance } from "../model/levelCompletedModel.js";

export class LevelCompletedRepository {
  async findByUser(idUser: number): Promise<LevelCompletedInstance[]> {
    if (!LevelCompleted) {
      throw new Error("LevelCompleted model not initialized");
    }
    return await LevelCompleted.findAll({ where: { idUser } });
  }

  async findByUserAndLevel(idUser: number, level: number): Promise<LevelCompletedInstance | null> {
    if (!LevelCompleted) {
      throw new Error("LevelCompleted model not initialized");
    }
    return await LevelCompleted.findOne({ where: { idUser, level } });
  }

  async findById(id: number): Promise<LevelCompletedInstance | null> {
    if (!LevelCompleted) {
      throw new Error("LevelCompleted model not initialized");
    }
    return await LevelCompleted.findByPk(id);
  }

  async create(data: {
    idUser: number;
    level: number;
    userSolution: string;
    quality?: number | null;
    evaluation?: string | null;
  }): Promise<LevelCompletedInstance> {
    if (!LevelCompleted) {
      throw new Error("LevelCompleted model not initialized");
    }
    return await LevelCompleted.create(data);
  }

  async update(
    record: LevelCompletedInstance,
    data: Partial<{ userSolution: string; quality: number | null; evaluation: string | null }>
  ): Promise<LevelCompletedInstance> {
    return await record.update(data);
  }

  async delete(id: number): Promise<void> {
    if (!LevelCompleted) {
      throw new Error("LevelCompleted model not initialized");
    }
    await LevelCompleted.destroy({ where: { id } });
  }
}

export const levelCompletedRepository = new LevelCompletedRepository();
