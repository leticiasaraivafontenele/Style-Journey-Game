import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import Cookies from 'js-cookie';
import { authService } from '../services/authService';

const ACCESS_TOKEN_KEY = 'accessToken';
const USERNAME_KEY = 'username';
const USER_ID_KEY = 'userId';
const AVATAR_ID_KEY = 'avatarId';
const LEVEL_KEY = 'level';

interface AuthContextType {
  isAuthenticated: boolean;
  userId: number | null;
  username: string | null;
  avatarId: number;
  level: number;
  login: (accessToken: string, username: string, userId: number, avatarId: number, level: number) => void;
  logout: () => Promise<void>;
  updateProfile: (username: string, avatarId: number, level: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [accessToken, setAccessToken] = useState<string | null>(
    () => Cookies.get(ACCESS_TOKEN_KEY) ?? null
  );
  const [username, setUsername] = useState<string | null>(
    () => Cookies.get(USERNAME_KEY) ?? null
  );
  const [userId, setUserId] = useState<number | null>(() => {
    const id = Cookies.get(USER_ID_KEY);
    const parsed = id ? parseInt(id) : null;
    return parsed !== null && !isNaN(parsed) ? parsed : null;
  });
  const [avatarId, setAvatarId] = useState<number>(() => {
    const id = Cookies.get(AVATAR_ID_KEY);
    const parsed = id ? parseInt(id) : NaN;
    return !isNaN(parsed) ? parsed : 1;
  });
  const [level, setLevel] = useState<number>(() => {
    const lvl = Cookies.get(LEVEL_KEY);
    const parsed = lvl ? parseInt(lvl) : NaN;
    return !isNaN(parsed) ? parsed : 1;
  });

  const login = (token: string, user: string, id: number, avatar: number, lvl: number) => {
    Cookies.set(ACCESS_TOKEN_KEY, token, { expires: 1, sameSite: 'Lax' });
    Cookies.set(USERNAME_KEY, user, { expires: 1, sameSite: 'Lax' });
    Cookies.set(USER_ID_KEY, String(id), { expires: 1, sameSite: 'Lax' });
    Cookies.set(AVATAR_ID_KEY, String(avatar), { expires: 1, sameSite: 'Lax' });
    Cookies.set(LEVEL_KEY, String(lvl), { expires: 1, sameSite: 'Lax' });
    setAccessToken(token);
    setUsername(user);
    setUserId(id);
    setAvatarId(avatar);
    setLevel(lvl);
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch {
    } finally {
      Cookies.remove(ACCESS_TOKEN_KEY);
      Cookies.remove(USERNAME_KEY);
      Cookies.remove(USER_ID_KEY);
      Cookies.remove(AVATAR_ID_KEY);
      Cookies.remove(LEVEL_KEY);
      setAccessToken(null);
      setUsername(null);
      setUserId(null);
      setAvatarId(1);
      setLevel(1);
    }
  };

  const updateProfile = (newUsername: string, newAvatarId: number, newLevel: number) => {
    Cookies.set(USERNAME_KEY, newUsername, { expires: 1, sameSite: 'Lax' });
    Cookies.set(AVATAR_ID_KEY, String(newAvatarId), { expires: 1, sameSite: 'Lax' });
    Cookies.set(LEVEL_KEY, String(newLevel), { expires: 1, sameSite: 'Lax' });
    setUsername(newUsername);
    setAvatarId(newAvatarId);
    setLevel(newLevel);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!accessToken,
        userId,
        username,
        avatarId,
        level,
        login,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
