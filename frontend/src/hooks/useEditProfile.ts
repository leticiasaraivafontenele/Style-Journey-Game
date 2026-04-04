import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { userService } from '../services/userService';
import { flashMessenger } from '../utils/flashMessenger';

interface UseEditProfileReturn {
  username: string;
  email: string;
  password: string;
  avatarId: number;
  error: string | null;
  isLoading: boolean;
  isFetching: boolean;
  setUsername: (value: string) => void;
  setEmail: (value: string) => void;
  setPassword: (value: string) => void;
  setAvatarId: (value: number) => void;
  handleUpdate: () => Promise<boolean>;
  handleDelete: () => Promise<boolean>;
}

export const useEditProfile = (): UseEditProfileReturn => {
  const { userId, avatarId: currentAvatarId, updateProfile, logout } = useAuth();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [avatarId, setAvatarId] = useState(currentAvatarId);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    if (!userId) {
      setIsFetching(false);
      return;
    }
    const fetchUser = async () => {
      try {
        const user = await userService.getUser(userId);
        setUsername(user.username);
        setEmail(user.email);
        setAvatarId(user.avatarId);
      } catch {
        setError('Erro ao carregar dados do perfil');
      } finally {
        setIsFetching(false);
      }
    };
    fetchUser();
  }, [userId]);

  const handleUpdate = async (): Promise<boolean> => {
    if (!userId) return false;
    setError(null);

    if (!username) {
      setError('O nome de usuário é obrigatório');
      return false;
    }

    setIsLoading(true);
    try {
      const payload: Record<string, string | number> = { username, avatarId };
      if (email) payload.email = email;
      if (password) payload.password = password;

      const updated = await userService.updateUser(userId, payload);
      updateProfile(updated.username, updated.avatarId, updated.level);
      flashMessenger('success', 'Perfil atualizado com sucesso!');
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao atualizar perfil');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (): Promise<boolean> => {
    if (!userId) return false;
    setIsLoading(true);
    try {
      await userService.deleteUser(userId);
      await logout();
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao excluir perfil');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    username,
    email,
    password,
    avatarId,
    error,
    isLoading,
    isFetching,
    setUsername,
    setEmail,
    setPassword,
    setAvatarId,
    handleUpdate,
    handleDelete,
  };
};
