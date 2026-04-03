import { levelCompletedRepository } from "../repository/levelCompletedRepository.js";
import { LevelCompletedInstance } from "../model/levelCompletedModel.js";

export class LevelCompletedService {
  async saveLevel(data: {
    idUser: number;
    level: number;
    userSolution: string;
  }): Promise<LevelCompletedInstance> {
    if (!data.idUser || data.level === undefined || !data.userSolution) {
      throw new Error("MISSING_FIELDS");
    }

    const existing = await levelCompletedRepository.findByUserAndLevel(data.idUser, data.level);

    if (existing) {
      return await levelCompletedRepository.update(existing, { userSolution: data.userSolution });
    }

    return await levelCompletedRepository.create(data);
  }

  async getLevelsByUser(idUser: number): Promise<LevelCompletedInstance[]> {
    return await levelCompletedRepository.findByUser(idUser);
  }

  async getLevelByUserAndLevel(
    idUser: number,
    level: number
  ): Promise<LevelCompletedInstance> {
    const record = await levelCompletedRepository.findByUserAndLevel(idUser, level);

    if (!record) {
      throw new Error("LEVEL_NOT_FOUND");
    }

    return record;
  }

  async updateLevel(id: number, data: Partial<{ userSolution: string }>): Promise<LevelCompletedInstance> {
    const record = await levelCompletedRepository.findById(id);

    if (!record) {
      throw new Error("LEVEL_COMPLETED_NOT_FOUND");
    }

    return await levelCompletedRepository.update(record, data);
  }

  async deleteLevel(id: number): Promise<void> {
    const record = await levelCompletedRepository.findById(id);

    if (!record) {
      throw new Error("LEVEL_COMPLETED_NOT_FOUND");
    }

    await levelCompletedRepository.delete(id);
  }
}

export const levelCompletedService = new LevelCompletedService();
