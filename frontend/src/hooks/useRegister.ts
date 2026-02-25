import { useState } from 'react';
import { authService } from '../services/authService';
import { flashMessenger } from '../utils/flashMessenger';
import { registerStrings } from '../strings/pt-br/login';

interface UseRegisterReturn {
  username: string;
  email: string;
  password: string;
  avatarId: number;
  error: string | null;
  isLoading: boolean;
  setUsername: (value: string) => void;
  setEmail: (value: string) => void;
  setPassword: (value: string) => void;
  setAvatarId: (value: number) => void;
  handleRegister: () => Promise<boolean>;
  resetForm: () => void;
}

export const useRegister = (): UseRegisterReturn => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [avatarId, setAvatarId] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const resetForm = () => {
    setUsername('');
    setEmail('');
    setPassword('');
    setAvatarId(1);
    setError(null);
  };

  const handleRegister = async (): Promise<boolean> => {
    setError(null);

    if (!username || !email || !password) {
      setError(registerStrings.errorMessage);
      return false;
    }

    setIsLoading(true);

    try {
      await authService.register({ username, email, password, avatarId });
      
      flashMessenger("success", registerStrings.registerSuccessMessage);
      
      resetForm();
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : registerStrings.errorUndefinedMessage);
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
    setUsername,
    setEmail,
    setPassword,
    setAvatarId,
    handleRegister,
    resetForm,
  };
};
