import { useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { levelService } from '../services/levelService';
import { userService } from '../services/userService';
import type { LevelCompleted, ChallengeContext } from '../services/levelService';

export interface PhaseCheckResult {
  completed: boolean;
  levelCompleted: LevelCompleted | null;
}

export interface PhaseEvaluationResult {
  quality: number | null;
  evaluation: string | null;
}

interface UsePhaseReturn {
  checkPhaseCompleted: (level: number) => Promise<PhaseCheckResult>;
  updateUserLevel: (level: number) => Promise<void>;
  evaluatePhase: (
    level: number,
    userSolution: string,
    challenge: ChallengeContext
  ) => Promise<PhaseEvaluationResult>;
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

  const evaluatePhase = useCallback(async (
    level: number,
    userSolution: string,
    challenge: ChallengeContext
  ): Promise<PhaseEvaluationResult> => {
    if (!userId) throw new Error('Usuário não autenticado');

    // The local AI evaluates and the backend persists the result in one call.
    // On failure this throws, so the phase is NOT completed and the user retries.
    const record = await levelService.evaluateLevel({ idUser: userId, level, userSolution, challenge });
    await updateUserLevel(level);

    return { quality: record.quality ?? null, evaluation: record.evaluation ?? null };
  }, [userId, updateUserLevel]);

  return {
    checkPhaseCompleted,
    updateUserLevel,
    evaluatePhase,
  };
};
