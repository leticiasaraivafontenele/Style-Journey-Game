import { useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { levelService } from '../services/levelService';
import { userService } from '../services/userService';
import type { LevelCompleted } from '../services/levelService';

export interface PhaseCheckResult {
  completed: boolean;
  levelCompleted: LevelCompleted | null;
}

interface UsePhaseReturn {
  checkPhaseCompleted: (level: number) => Promise<PhaseCheckResult>;
  updateUserLevel: (level: number) => Promise<void>;
  savePhase: (level: number, userSolution: string) => Promise<void>;
}

export const usePhase = (): UsePhaseReturn => {
  const { userId, level: currentLevel, updateProfile } = useAuth();

  const checkPhaseCompleted = useCallback(async (level: number): Promise<PhaseCheckResult> => {
    if (!userId) return { completed: false, levelCompleted: null };
    try {
      const data = await levelService.getLevelByUserAndLevel(userId, level);
      return { completed: true, levelCompleted: data };
    } catch {
      return { completed: false, levelCompleted: null };
    }
  }, [userId]);

  const updateUserLevel = useCallback(async (level: number): Promise<void> => {
    if (!userId || level <= currentLevel) return;
    try {
      const updated = await userService.updateUser(userId, { level });
      updateProfile(updated.username, updated.avatarId, updated.level);
    } catch (err) {
      console.error('Erro ao atualizar level do usuário:', err);
    }
  }, [userId, currentLevel, updateProfile]);

  const savePhase = useCallback(async (level: number, userSolution: string): Promise<void> => {
    if (!userId) return;
    try {
      const { completed, levelCompleted } = await checkPhaseCompleted(level);
      if (!completed) {
        await levelService.saveLevel({ idUser: userId, level, userSolution });
        await updateUserLevel(level);

        return;
      } 
      if (levelCompleted) {
        await levelService.updateLevel(levelCompleted.id, { userSolution });
      }
    } catch (err) {
      console.error('Erro ao salvar fase:', err);
    }
  }, [userId, checkPhaseCompleted, updateUserLevel]);

  return {
    checkPhaseCompleted,
    updateUserLevel,
    savePhase,
  };
};
