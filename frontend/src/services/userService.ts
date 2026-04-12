import api from './api';

export interface UserData {
  id: number;
  username: string;
  email: string;
  avatarId: number;
  level: number;
}

export interface UpdateUserPayload {
  username?: string;
  email?: string;
  password?: string;
  avatarId?: number;
  level?: number;
}

export const userService = {
  async getUser(id: number): Promise<UserData> {
    try {
      const response = await api.get<{ data: UserData }>(`/api/users/${id}`);
      return response.data.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Erro ao buscar usuário');
    }
  },

  async updateUser(id: number, data: UpdateUserPayload): Promise<UserData> {
    try {
      const response = await api.put<{ message: string; data: UserData }>(`/api/users/${id}`, data);
      return response.data.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Erro ao atualizar usuário');
    }
  },

  async deleteUser(id: number): Promise<void> {
    try {
      await api.delete(`/api/users/${id}`);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Erro ao excluir usuário');
    }
  },
};
