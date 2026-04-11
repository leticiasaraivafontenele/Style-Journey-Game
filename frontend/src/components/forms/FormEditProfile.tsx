import { FiAlertTriangle } from 'react-icons/fi';
import { useEditProfile } from '../../hooks/useEditProfile';
import AvatarSelector from '../avatar/AvatarSelector';
import { editProfileStrings } from '../../strings/pt-br/editProfile';

interface FormEditProfileProps {
  onSuccess: () => void;
  onRequestDelete: () => void;
}

export default function FormEditProfile({ onSuccess, onRequestDelete }: FormEditProfileProps) {
  const {
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
  } = useEditProfile();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await handleUpdate();
    if (success) onSuccess();
  };

  if (isFetching) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p className="text-amber-900 font-start font-bold text-lg">{editProfileStrings.loading}</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <h2 className="text-4xl font-black font-start text-amber-900">{editProfileStrings.title}</h2>

      <form onSubmit={handleSubmit} className="w-full space-y-2 p-6">
        <div id="fields" className="flex w-full items-center">
          <div id="auth-fields" className="w-full flex flex-col gap-4">
            <div>
              <label
                htmlFor="edit-username"
                className="block text-base font-medium text-black mb-1"
              >
                {editProfileStrings.usernameLabel}
              </label>
              <input
                id="edit-username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-black"
                placeholder={editProfileStrings.usernamePlaceholder}
                disabled={isLoading}
              />
            </div>

            <div>
              <label
                htmlFor="edit-email"
                className="block text-base font-medium text-black mb-1"
              >
                {editProfileStrings.emailLabel}
              </label>
              <input
                id="edit-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-black"
                placeholder={editProfileStrings.emailPlaceholder}
                disabled={isLoading}
              />
            </div>

            <div>
              <label
                htmlFor="edit-password"
                className="block text-base font-medium text-black mb-1"
              >
                {editProfileStrings.passwordLabel} <span className="text-gray-500 text-sm">{editProfileStrings.passwordHint}</span>
              </label>
              <input
                id="edit-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-black"
                placeholder={editProfileStrings.passwordPlaceholder}
                disabled={isLoading}
              />
            </div>
          </div>

          <AvatarSelector
            selectedAvatarId={avatarId}
            onAvatarSelect={setAvatarId}
            disabled={isLoading}
          />
        </div>

        <div className="h-4">
          {error && (
            <div className="text-red-600 text-sm font-bold items-center flex justify-center">
              <FiAlertTriangle className="inline mr-1" />
              {error}
            </div>
          )}
        </div>

        <div className="flex flex-col mt-4 gap-3 w-full items-center">
          <button
            type="submit"
            disabled={isLoading}
            className="w-70 bg-yellow-600 hover:bg-yellow-700 text-sm text-white font-start font-bold py-2 px-4 rounded-md transition-colors duration-200 disabled:bg-gray-400 cursor-pointer disabled:cursor-not-allowed"
          >
            {isLoading ? editProfileStrings.savingButton : editProfileStrings.saveButton}
          </button>

          <button
            type="button"
            onClick={onRequestDelete}
            disabled={isLoading}
            className="w-70 bg-red-700 hover:bg-red-600 text-sm text-white font-start font-bold py-2 px-4 rounded-md transition-colors duration-200 disabled:bg-gray-400 cursor-pointer disabled:cursor-not-allowed"
          >
            {editProfileStrings.deleteButton}
          </button>
        </div>
      </form>
    </div>
  );
}
