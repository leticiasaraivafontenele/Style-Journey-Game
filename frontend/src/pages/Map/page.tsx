import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { userService } from '../../services/userService';
import MapBackground from '../../components/MapBackground';
import MapHUD from '../../components/MapHUD';
import ModalMap from '../../components/ModalMap';
import ModalConfirm from '../../components/ModalConfirm';
import FormEditProfile from '../../components/FormEditProfile';

type ActiveModal = 'none' | 'settings' | 'editProfile' | 'about';

export default function MapPage() {
  const { username, avatarId, level, userId, logout } = useAuth();
  const navigate = useNavigate();
  const [activeModal, setActiveModal] = useState<ActiveModal>('none');
  const [confirmAction, setConfirmAction] = useState<'logout' | 'delete' | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const closeAll = () => {
    setActiveModal('none');
    setConfirmAction(null);
  };

  const handleLogoutConfirmed = async () => {
    setIsProcessing(true);
    await logout();
    navigate('/');
  };

  const handleDeleteConfirmed = async () => {
    if (!userId) return;
    setIsProcessing(true);
    try {
      await userService.deleteUser(userId);
      await logout();
      navigate('/');
    } catch {
      setIsProcessing(false);
      setConfirmAction(null);
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <MapHUD
        username={username}
        avatarId={avatarId}
        level={level}
        onSettingsClick={() => setActiveModal('settings')}
      />

      <MapBackground />

      {/* Settings Modal */}
      <ModalMap
        showMap={activeModal === 'settings'}
        handleMapCloseClick={closeAll}
        darkenBackground
      >
        <div className="flex flex-col items-center justify-center h-full gap-6">
          <h2 className="text-3xl font-black font-cinzel text-amber-900">Configurações</h2>

          <button
            onClick={() => setActiveModal('editProfile')}
            className="w-60 bg-amber-900 hover:bg-amber-700 text-white font-cinzel font-bold py-3 px-6 rounded-md transition-colors duration-200 cursor-pointer"
          >
            Editar Perfil
          </button>

          <button
            onClick={() => setActiveModal('about')}
            className="w-60 bg-amber-900 hover:bg-amber-700 text-white font-cinzel font-bold py-3 px-6 rounded-md transition-colors duration-200 cursor-pointer"
          >
            Sobre
          </button>

          <button
            onClick={() => { setActiveModal('none'); setConfirmAction('logout'); }}
            className="w-60 bg-red-700 hover:bg-red-600 text-white font-cinzel font-bold py-3 px-6 rounded-md transition-colors duration-200 cursor-pointer"
          >
            Sair
          </button>
        </div>
      </ModalMap>

      {/* Edit Profile Modal */}
      <ModalMap
        showMap={activeModal === 'editProfile'}
        handleMapCloseClick={closeAll}
        darkenBackground
      >
        <FormEditProfile
          onSuccess={closeAll}
          onRequestDelete={() => { setActiveModal('none'); setConfirmAction('delete'); }}
        />
      </ModalMap>

      {/* About Modal */}
      <ModalMap
        showMap={activeModal === 'about'}
        handleMapCloseClick={closeAll}
        darkenBackground
      >
        <div className="flex flex-col items-center justify-center h-full gap-4 px-8 text-center">
          <h2 className="text-3xl font-black font-cinzel text-amber-900">Sobre</h2>
          <p className="text-amber-900 font-medium text-base leading-relaxed max-w-xl">
            <strong>Style Journey</strong> é um jogo educativo desenvolvido como Trabalho de Conclusão de Curso,
            com o objetivo de ensinar CSS de forma interativa e gamificada.
          </p>
          <p className="text-amber-800 text-sm leading-relaxed max-w-xl">
            Explore os módulos do mapa, complete os desafios de estilização e evolua seu personagem
            enquanto aprende sobre seletores, cores, tipografia e muito mais.
          </p>
          <p className="text-amber-700 text-xs mt-2">
            Desenvolvido com React, TypeScript e muito carinho.
          </p>
        </div>
      </ModalMap>

      {/* Logout Confirmation */}
      <ModalConfirm
        show={confirmAction === 'logout'}
        title="Sair do jogo"
        message="Tem certeza que deseja deslogar?"
        confirmLabel="Sair"
        cancelLabel="Cancelar"
        onConfirm={handleLogoutConfirmed}
        onCancel={() => setConfirmAction(null)}
        isLoading={isProcessing}
      />

      {/* Delete Account Confirmation */}
      <ModalConfirm
        show={confirmAction === 'delete'}
        title="Excluir perfil"
        message="Tem certeza? Esta ação é irreversível e todos os seus dados serão removidos permanentemente."
        confirmLabel="Excluir"
        cancelLabel="Cancelar"
        onConfirm={handleDeleteConfirmed}
        onCancel={() => setConfirmAction(null)}
        isLoading={isProcessing}
      />
    </div>
  );
}
