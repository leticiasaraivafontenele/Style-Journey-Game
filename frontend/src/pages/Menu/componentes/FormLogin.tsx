import { useState } from 'react';
import { FiAlertTriangle } from 'react-icons/fi';
import { useLogin } from '../../../hooks/useLogin';
import { useRegister } from '../../../hooks/useRegister';
import { loginStrings, registerStrings } from '../../../strings/pt-br/login';
import AvatarSelector from '../../../components/AvatarSelector';

export default function FormLogin() {
  const [isRegisterMode, setIsRegisterMode] = useState(false);

  const {
    username: loginUsername,
    password: loginPassword,
    error: loginError,
    isLoading: loginIsLoading,
    setUsername: setLoginUsername,
    setPassword: setLoginPassword,
    handleLogin,
  } = useLogin();

  const {
    username: registerUsername,
    email,
    password: registerPassword,
    avatarId,
    error: registerError,
    isLoading: registerIsLoading,
    setUsername: setRegisterUsername,
    setEmail,
    setPassword: setRegisterPassword,
    setAvatarId,
    handleRegister,
    resetForm: resetRegisterForm,
  } = useRegister();

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleLogin();
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await handleRegister();
    if (success) {
      setIsRegisterMode(false);
    }
  };

  const toggleMode = () => {
    setIsRegisterMode(!isRegisterMode);
    setLoginUsername('');
    setLoginPassword('');
    resetRegisterForm();
  };

  if (isRegisterMode) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-6">
        <h2 className="text-4xl font-black font-serif text-white">{registerStrings.title}</h2>
        
        <form onSubmit={handleRegisterSubmit} className="w-full max-w-sm space-y-2">
          <div>
            <label 
              htmlFor="register-username" 
              className="block text-base font-medium text-white mb-1"
            >
              {registerStrings.usernameLabel}
            </label>
            <input
              id="register-username"
              type="text"
              value={registerUsername}
              onChange={(e) => setRegisterUsername(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white"
              placeholder={registerStrings.usernamePlaceholder}
              disabled={registerIsLoading}
            />
          </div>

          <div>
            <label 
              htmlFor="email" 
              className="block text-base font-medium text-white mb-1"
            >
              {registerStrings.emailLabel}
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white"
              placeholder={registerStrings.emailPlaceholder}
              disabled={registerIsLoading}
            />
          </div>

          <div>
            <label 
              htmlFor="register-password" 
              className="block text-base font-medium text-white mb-1"
            >
              {registerStrings.passwordLabel}
            </label>
            <input
              id="register-password"
              type="password"
              value={registerPassword}
              onChange={(e) => setRegisterPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white"
              placeholder={registerStrings.passwordPlaceholder}
              disabled={registerIsLoading}
            />
          </div>

          <AvatarSelector
            selectedAvatarId={avatarId}
            onAvatarSelect={setAvatarId}
            disabled={registerIsLoading}
          />

          <div className="h-4">
            {registerError && (
              <div className="text-red-600 text-sm font-bold items-center flex justify-center">
                <FiAlertTriangle className="inline mr-1" />{registerError}
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={registerIsLoading}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-md transition-colors duration-200 disabled:bg-gray-400 cursor-pointer disabled:cursor-not-allowed"
          >
            {registerIsLoading ? registerStrings.loadingButton : registerStrings.registerButton}
          </button>

          <button
            type="button"
            onClick={toggleMode}
            disabled={registerIsLoading}
            className="w-full bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-md transition-colors duration-200 disabled:bg-gray-400 cursor-pointer disabled:cursor-not-allowed"
          >
            {registerStrings.toggleToLogin}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-start px-6 py-10">
      <h2 className="text-4xl font-black font-serif mb-6 text-white">{loginStrings.title}</h2>
      
      <form onSubmit={handleLoginSubmit} className="w-full max-w-sm space-y-3">
        <div>
          <label 
            htmlFor="username" 
            className="block text-base font-medium text-white mb-1"
          >
            {loginStrings.usernameLabel}
          </label>
          <input
            id="username"
            type="text"
            value={loginUsername}
            onChange={(e) => setLoginUsername(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white"
            placeholder={loginStrings.usernamePlaceholder}
            disabled={loginIsLoading}
          />
        </div>

        <div>
          <label 
            htmlFor="password" 
            className="block text-base font-medium text-white mb-1"
          >
            {loginStrings.passwordLabel}
          </label>
          <input
            id="password"
            type="password"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white"
            placeholder={loginStrings.passwordPlaceholder}
            disabled={loginIsLoading}
          />
        </div>
        <div className="h-5">
          {loginError && (
            <div className="text-red-600 text-sm font-bold items-center flex justify-center">
              <FiAlertTriangle className="inline mr-1" />{loginError}
            </div>
          )}
        </div>
        <button
          type="submit"
          disabled={loginIsLoading}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-md transition-colors duration-200 disabled:bg-gray-400 cursor-pointer disabled:cursor-not-allowed"
        >
          {loginIsLoading ? loginStrings.loadingButton : loginStrings.loginButton}
        </button>

        <button
          type="button"
          onClick={toggleMode}
          disabled={loginIsLoading}
          className="w-full bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-md transition-colors duration-200 disabled:bg-gray-400 cursor-pointer disabled:cursor-not-allowed"
        >
          {loginStrings.toggleToRegister}
        </button>
      </form>
    </div>
  );
}
