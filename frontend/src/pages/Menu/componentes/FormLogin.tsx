import { FiAlertTriangle } from 'react-icons/fi';
import { useLogin } from '../../../hooks/useLogin';
import { loginStrings } from '../../../strings/pt-br/login';

export default function FormLogin() {
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
    <div className="w-full h-full flex flex-col items-center justify-center p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">{loginStrings.title}</h2>
      
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
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
      </form>
    </div>
  );
}
