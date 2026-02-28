import api from './api';

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  userData: {
    username: string;
    accessToken: string;
    refreshToken: string;
  };
}

export interface RegisterCredentials {
  username: string;
  email: string;
  password: string;
  avatarId?: number;
}

export interface RegisterResponse {
  message: string;
  userData: {
    username: string;
    email: string;
  };
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    try {
      const response = await api.post<LoginResponse>('/api/login', credentials);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Erro ao fazer login');
    }
  },

  async register(credentials: RegisterCredentials): Promise<RegisterResponse> {
    try {
      const response = await api.post<RegisterResponse>('/api/register', credentials);
      console.log('Register success:', response.data);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Erro ao registrar usuário');
    }
  },

  async logout(): Promise<void> {
    try {
      await api.post('/api/logout');
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Erro ao fazer logout');
    }
  },
};
