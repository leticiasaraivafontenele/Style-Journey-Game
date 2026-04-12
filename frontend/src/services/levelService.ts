import api from './api';

export interface LevelCompleted {
  id: number;
  idUser: number;
  level: number;
  userSolution: string;
}

export interface SaveLevelPayload {
  idUser: number;
  level: number;
  userSolution: string;
}

export interface UpdateLevelPayload {
  userSolution?: string;
}

export const levelService = {
  async saveLevel(data: SaveLevelPayload): Promise<LevelCompleted> {
    try {
      const response = await api.post<{ message: string; data: LevelCompleted }>('/api/levels', data);
      return response.data.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Erro ao salvar level');
    }
  },

  async getLevelsByUser(idUser: number): Promise<LevelCompleted[]> {
    try {
      const response = await api.get<{ data: LevelCompleted[] }>(`/api/levels/user/${idUser}`);
      return response.data.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Erro ao buscar levels do usuário');
    }
  },

  async getLevelByUserAndLevel(idUser: number, level: number): Promise<LevelCompleted> {
    try {
      const response = await api.get<{ data: LevelCompleted }>(`/api/levels/user/${idUser}/level/${level}`);
      return response.data.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Erro ao buscar level do usuário');
    }
  },

  async updateLevel(id: number, data: UpdateLevelPayload): Promise<LevelCompleted> {
    try {
      const response = await api.put<{ message: string; data: LevelCompleted }>(`/api/levels/${id}`, data);
      return response.data.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Erro ao atualizar level');
    }
  },

  async deleteLevel(id: number): Promise<void> {
    try {
      await api.delete(`/api/levels/${id}`);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Erro ao excluir level');
    }
  },
};
