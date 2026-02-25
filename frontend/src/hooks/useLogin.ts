import { useState } from 'react';
import { authService } from '../services/authService';
import { flashMessenger } from '../utils/flashMessenger';
import { loginStrings } from '../strings/pt-br/login';

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

  const handleLogin = async () => {
    setError(null);
    
    if (!username || !password) {
      setError(loginStrings.errorMessage);
      return;
    }

    setIsLoading(true);

    try {
      const response = await authService.login({ username, password });
      
      localStorage.setItem('accessToken', response.userData.accessToken);
      localStorage.setItem('username', response.userData.username);
      
      console.log('Login success!', response.message);
      flashMessenger("success", loginStrings.loginSuccessMessage);
      
      setUsername('');
      setPassword('');
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
