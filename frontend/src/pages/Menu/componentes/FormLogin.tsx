import { useState } from 'react';
import { FiAlertTriangle } from 'react-icons/fi';
import { useLogin } from '../../../hooks/useLogin';
import { loginStrings, registerStrings } from '../../../strings/pt-br/login';
import { authService } from '../../../services/authService';
import { flashMessenger } from '../../../utils/flashMessenger';
import AvatarSelector from '../../../components/AvatarSelector';

export default function FormLogin() {
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [email, setEmail] = useState('');
  const [avatarId, setAvatarId] = useState(1);
  const [registerError, setRegisterError] = useState<string | null>(null);
  const [isRegisterLoading, setIsRegisterLoading] = useState(false);

  const {
    username,
    password,
    error,
    isLoading,
    setUsername,
    setPassword,
    handleLogin,
  } = useLogin();

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleLogin();
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegisterError(null);

    if (!username || !email || !password) {
      setRegisterError(registerStrings.errorMessage);
      return;
    }

    setIsRegisterLoading(true);

    try {
      await authService.register({ username, email, password, avatarId });
      
      flashMessenger("success", registerStrings.registerSuccessMessage);
      
      setUsername('');
      setEmail('');
      setPassword('');
      setAvatarId(1);
      setIsRegisterMode(false);
    } catch (err) {
      setRegisterError(err instanceof Error ? err.message : registerStrings.errorUndefinedMessage);
    } finally {
      setIsRegisterLoading(false);
    }
  };

  const toggleMode = () => {
    setIsRegisterMode(!isRegisterMode);
    setUsername('');
    setEmail('');
    setPassword('');
    setAvatarId(1);
    setRegisterError(null);
  };

  if (isRegisterMode) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">{registerStrings.title}</h2>
        
        <form onSubmit={handleRegisterSubmit} className="w-full max-w-sm space-y-4">
          <div>
            <label 
              htmlFor="register-username" 
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {registerStrings.usernameLabel}
            </label>
            <input
              id="register-username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder={registerStrings.usernamePlaceholder}
              disabled={isRegisterLoading}
            />
          </div>

          <div>
            <label 
              htmlFor="email" 
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {registerStrings.emailLabel}
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder={registerStrings.emailPlaceholder}
              disabled={isRegisterLoading}
            />
          </div>

          <div>
            <label 
              htmlFor="register-password" 
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {registerStrings.passwordLabel}
            </label>
            <input
              id="register-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder={registerStrings.passwordPlaceholder}
              disabled={isRegisterLoading}
            />
          </div>

          <AvatarSelector
            selectedAvatarId={avatarId}
            onAvatarSelect={setAvatarId}
            disabled={isRegisterLoading}
          />

          <div className="h-5">
            {registerError && (
              <div className="text-red-600 text-sm items-center flex justify-center">
                <FiAlertTriangle className="inline mr-1" />{registerError}
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={isRegisterLoading}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-md transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isRegisterLoading ? registerStrings.loadingButton : registerStrings.registerButton}
          </button>

          <button
            type="button"
            onClick={toggleMode}
            disabled={isRegisterLoading}
            className="w-full bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-md transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {registerStrings.toggleToLogin}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">{loginStrings.title}</h2>
      
      <form onSubmit={handleLoginSubmit} className="w-full max-w-sm space-y-4">
        <div>
          <label 
            htmlFor="username" 
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {loginStrings.usernameLabel}
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder={loginStrings.usernamePlaceholder}
            disabled={isLoading}
          />
        </div>

        <div>
          <label 
            htmlFor="password" 
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {loginStrings.passwordLabel}
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder={loginStrings.passwordPlaceholder}
            disabled={isLoading}
          />
        </div>
        <div className="h-5">
          {error && (
            <div className="text-red-600 text-sm items-center flex justify-center">
              <FiAlertTriangle className="inline mr-1" />{error}
            </div>
          )}
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-md transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isLoading ? loginStrings.loadingButton : loginStrings.loginButton}
        </button>

        <button
          type="button"
          onClick={toggleMode}
          disabled={isLoading}
          className="w-full bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-md transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {loginStrings.toggleToRegister}
        </button>
      </form>
    </div>
  );
}
