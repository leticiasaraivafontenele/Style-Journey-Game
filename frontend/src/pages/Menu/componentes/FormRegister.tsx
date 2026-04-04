import { FiAlertTriangle } from 'react-icons/fi';
import { useRegister } from '../../../hooks/useRegister';
import { registerStrings } from '../../../strings/pt-br/login';
import AvatarSelector from '../../../components/AvatarSelector';

interface FormRegisterProps {
  onSwitchToLogin: () => void;
}

export default function FormRegister({ onSwitchToLogin }: FormRegisterProps) {
  const {
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
  } = useRegister();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await handleRegister();
    if (success) {
      resetForm();
      onSwitchToLogin();
    }
  };

  const handleSwitch = () => {
    resetForm();
    onSwitchToLogin();
  };

  return (
    <div className="w-full flex flex-col items-center justify-center p-6">
      <h2 className="text-4xl font-black font-serif text-white">{registerStrings.title}</h2>

      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-2">
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
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white"
            placeholder={registerStrings.usernamePlaceholder}
            disabled={isLoading}
          />
        </div>

        <div>
          <label
            htmlFor="register-email"
            className="block text-base font-medium text-white mb-1"
          >
            {registerStrings.emailLabel}
          </label>
          <input
            id="register-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white"
            placeholder={registerStrings.emailPlaceholder}
            disabled={isLoading}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white"
            placeholder={registerStrings.passwordPlaceholder}
            disabled={isLoading}
          />
        </div>

        <AvatarSelector
          selectedAvatarId={avatarId}
          onAvatarSelect={setAvatarId}
          disabled={isLoading}
        />

        <div className="h-4">
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
          {isLoading ? registerStrings.loadingButton : registerStrings.registerButton}
        </button>

        <button
          type="button"
          onClick={handleSwitch}
          disabled={isLoading}
          className="w-full bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-md transition-colors duration-200 disabled:bg-gray-400 cursor-pointer disabled:cursor-not-allowed"
        >
          {registerStrings.toggleToLogin}
        </button>
      </form>
    </div>
  );
}
