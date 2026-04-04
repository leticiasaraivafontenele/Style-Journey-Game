import { FiAlertTriangle } from 'react-icons/fi';
import { useLogin } from '../../../hooks/useLogin';
import { loginStrings } from '../../../strings/pt-br/login';

interface FormLoginProps {
  onSwitchToRegister: () => void;
}

export default function FormLogin({ onSwitchToRegister }: FormLoginProps) {
  const {
    username,
    password,
    error,
    isLoading,
    setUsername,
    setPassword,
    handleLogin,
  } = useLogin();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleLogin();
  };

  return (
    <div className="w-full flex flex-col items-center justify-center px-6 py-4">
      <h2 className="text-4xl font-black font-serif mb-6 text-white">{loginStrings.title}</h2>

      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-3">
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
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white"
            placeholder={loginStrings.usernamePlaceholder}
            disabled={isLoading}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white"
            placeholder={loginStrings.passwordPlaceholder}
            disabled={isLoading}
          />
        </div>

        <div className="h-5">
          {error && (
            <div className="text-red-600 text-sm font-bold items-center flex justify-center">
              <FiAlertTriangle className="inline mr-1" />{error}
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-md transition-colors duration-200 disabled:bg-gray-400 cursor-pointer disabled:cursor-not-allowed"
        >
          {isLoading ? loginStrings.loadingButton : loginStrings.loginButton}
        </button>

        <button
          type="button"
          onClick={onSwitchToRegister}
          disabled={isLoading}
          className="w-full bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-md transition-colors duration-200 disabled:bg-gray-400 cursor-pointer disabled:cursor-not-allowed"
        >
          {loginStrings.toggleToRegister}
        </button>
      </form>
    </div>
  );
}
