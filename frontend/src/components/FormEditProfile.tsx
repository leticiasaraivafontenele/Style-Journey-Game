import { FiAlertTriangle } from 'react-icons/fi';
import { useEditProfile } from '../hooks/useEditProfile';
import AvatarSelector from './AvatarSelector';

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
        <p className="text-amber-900 font-cinzel font-bold text-lg">Carregando...</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <h2 className="text-4xl font-black font-cinzel text-amber-900">Editar Perfil</h2>

      <form onSubmit={handleSubmit} className="w-full space-y-2 p-6">
        <div id="fields" className="flex w-full items-center">
          <div id="auth-fields" className="w-full flex flex-col gap-4">
            <div>
              <label
                htmlFor="edit-username"
                className="block text-base font-medium text-black mb-1"
              >
                Usuário
              </label>
              <input
                id="edit-username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-black"
                placeholder="Digite seu usuário"
                disabled={isLoading}
              />
            </div>

            <div>
              <label
                htmlFor="edit-email"
                className="block text-base font-medium text-black mb-1"
              >
                E-mail
              </label>
              <input
                id="edit-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-black"
                placeholder="Digite seu e-mail"
                disabled={isLoading}
              />
            </div>

            <div>
              <label
                htmlFor="edit-password"
                className="block text-base font-medium text-black mb-1"
              >
                Nova Senha <span className="text-gray-500 text-sm">(deixe em branco para manter)</span>
              </label>
              <input
                id="edit-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-black"
                placeholder="Nova senha (opcional)"
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
            className="w-60 bg-yellow-600 hover:bg-yellow-700 text-white font-cinzel font-bold py-2 px-4 rounded-md transition-colors duration-200 disabled:bg-gray-400 cursor-pointer disabled:cursor-not-allowed"
          >
            {isLoading ? 'Salvando...' : 'Salvar Alterações'}
          </button>

          <button
            type="button"
            onClick={onRequestDelete}
            disabled={isLoading}
            className="w-60 bg-red-700 hover:bg-red-600 text-white font-cinzel font-bold py-2 px-4 rounded-md transition-colors duration-200 disabled:bg-gray-400 cursor-pointer disabled:cursor-not-allowed"
          >
            Excluir Perfil
          </button>
        </div>
      </form>
    </div>
  );
}
