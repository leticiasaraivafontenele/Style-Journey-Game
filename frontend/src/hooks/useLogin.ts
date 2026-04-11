import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import { flashMessenger } from '../utils/flashMessenger';
import { loginStrings } from '../strings/pt-br/login';
import { useAuth } from '../contexts/AuthContext';

interface UseLoginReturn {
  username: string;
  password: string;
  error: string | null;
  isLoading: boolean;
  setUsername: (value: string) => void;
  setPassword: (value: string) => void;
  handleLogin: () => Promise<void>;
}

export const useLogin = (): UseLoginReturn => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError(null);

    if (!username || !password) {
      setError(loginStrings.errorMessage);
      return;
    }

    setIsLoading(true);

    try {
      const response = await authService.login({ username, password });

      login(
        response.userData.accessToken,
        response.userData.username,
        response.userData.userId,
        response.userData.avatarId,
        response.userData.level,
      );

      flashMessenger('success', loginStrings.loginSuccessMessage);

      setUsername('');
      setPassword('');

      navigate('/map');
    } catch (err) {
      setError(err instanceof Error ? err.message : loginStrings.errorUndefinedMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    username,
    password,
    error,
    isLoading,
    setUsername,
    setPassword,
    handleLogin,
  };
};
