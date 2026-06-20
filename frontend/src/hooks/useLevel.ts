import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { levelService } from '../services/levelService';
import type { LevelCompleted, SaveLevelPayload, UpdateLevelPayload } from '../services/levelService';

interface UseLevelReturn {
  levels: LevelCompleted[];
  currentLevel: LevelCompleted | null;
  error: string | null;
  isLoading: boolean;
  isFetching: boolean;
  fetchLevelsByUser: () => Promise<void>;
  fetchLevelByNumber: (level: number) => Promise<void>;
  handleSaveLevel: (level: number, userSolution: string) => Promise<LevelCompleted | null>;
  handleUpdateLevel: (id: number, data: UpdateLevelPayload) => Promise<LevelCompleted | null>;
  handleDeleteLevel: (id: number) => Promise<boolean>;
}

export const useLevel = (): UseLevelReturn => {
  const { userId } = useAuth();

  const [levels, setLevels] = useState<LevelCompleted[]>([]);
  const [currentLevel, setCurrentLevel] = useState<LevelCompleted | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const fetchLevelsByUser = useCallback(async () => {
    if (!userId) return;
    setIsFetching(true);
    setError(null);
    try {
      const data = await levelService.getLevelsByUser(userId);
      setLevels(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao buscar levels do usuário');
    } finally {
      setIsFetching(false);
    }
  }, [userId]);

  const fetchLevelByNumber = useCallback(async (level: number) => {
    if (!userId) return;
    setIsFetching(true);
    setError(null);
    try {
      const data = await levelService.getLevelByUserAndLevel(userId, level);
      setCurrentLevel(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao buscar level');
    } finally {
      setIsFetching(false);
    }
  }, [userId]);

  const handleSaveLevel = async (level: number, userSolution: string): Promise<LevelCompleted | null> => {
    if (!userId) return null;
    setIsLoading(true);
    setError(null);
    try {
      const payload: SaveLevelPayload = { idUser: userId, level, userSolution };
      const saved = await levelService.saveLevel(payload);
      setLevels(prev => {
        const exists = prev.findIndex(l => l.level === saved.level);
        if (exists !== -1) {
          const updated = [...prev];
          updated[exists] = saved;
          return updated;
        }
        return [...prev, saved];
      });
      return saved;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao salvar level');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateLevel = async (id: number, data: UpdateLevelPayload): Promise<LevelCompleted | null> => {
    setIsLoading(true);
    setError(null);
    try {
      const updated = await levelService.updateLevel(id, data);
      setLevels(prev => prev.map(l => (l.id === id ? updated : l)));
      return updated;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao atualizar level');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteLevel = async (id: number): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    try {
      await levelService.deleteLevel(id);
      setLevels(prev => prev.filter(l => l.id !== id));
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao excluir level');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLevelsByUser();
  }, [fetchLevelsByUser]);

  return {
    levels,
    currentLevel,
    error,
    isLoading,
    isFetching,
    fetchLevelsByUser,
    fetchLevelByNumber,
    handleSaveLevel,
    handleUpdateLevel,
    handleDeleteLevel,
  };
};
