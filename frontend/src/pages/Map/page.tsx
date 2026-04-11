import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { userService } from '../../services/userService';
import MapBackground from '../../components/MapBackground';
import AvatarPlate from '../../components/avatar/AvatarPlate';
import ModalPaper from '../../components/modal/ModalPaper';
import ModalConfirm from '../../components/modal/ModalConfirm';
import FormEditProfile from '../../components/forms/FormEditProfile';
import { mapStrings } from '../../strings/pt-br/map';

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
      <AvatarPlate
        username={username}
        avatarId={avatarId}
        level={level}
        onSettingsClick={() => setActiveModal('settings')}
      />

      <MapBackground />

      {/* Settings Modal */}
      <ModalPaper
        showMap={activeModal === 'settings'}
        handleMapCloseClick={closeAll}
        darkenBackground
      >
        <div className="flex flex-col items-center h-full">
          <h2 className="text-4xl mb-30 font-black font-cinzel text-amber-900">{mapStrings.settingsTitle}</h2>

          <div className='flex flex-col gap-6'>
            <button
              onClick={() => setActiveModal('editProfile')}
              className="w-60 bg-yellow-600 hover:bg-yellow-700 text-white font-cinzel font-bold py-3 px-6 rounded-md transition-colors duration-200 cursor-pointer"
            >
              {mapStrings.editProfileButton}
            </button>

            <button
              onClick={() => setActiveModal('about')}
              className="w-60 bg-yellow-600 hover:bg-yellow-700 text-white font-cinzel font-bold py-3 px-6 rounded-md transition-colors duration-200 cursor-pointer"
            >
              {mapStrings.aboutButton}
            </button>

            <button
              onClick={() => setConfirmAction('logout')}
              className="w-60 bg-red-700 hover:bg-red-600 text-white font-cinzel font-bold py-3 px-6 rounded-md transition-colors duration-200 cursor-pointer"
            >
              {mapStrings.logoutButton}
            </button>            
          </div>

        </div>
      </ModalPaper>

      {/* Edit Profile Modal */}
      <ModalPaper
        showMap={activeModal === 'editProfile'}
        handleMapCloseClick={closeAll}
        goBackTo={() => setActiveModal('settings')}
        darkenBackground
      >
        <FormEditProfile
          onSuccess={closeAll}
          onRequestDelete={() => setConfirmAction('delete')}
        />
      </ModalPaper>

      {/* About Modal */}
      <ModalPaper
        showMap={activeModal === 'about'}
        handleMapCloseClick={closeAll}
        goBackTo={() => setActiveModal('settings')}
        darkenBackground
      >
        <div className="flex flex-col items-center justify-center h-full gap-4 px-8 text-center">
          <h2 className="text-3xl font-black font-cinzel text-amber-900">{mapStrings.aboutTitle}</h2>
          <p className="text-amber-900 font-medium text-base leading-relaxed max-w-xl">
            <strong>{mapStrings.aboutGameName}</strong>{mapStrings.aboutDescription1}
          </p>
          <p className="text-amber-800 text-sm leading-relaxed max-w-xl">
            {mapStrings.aboutDescription2}
          </p>
          <p className="text-amber-700 text-xs mt-2">
            {mapStrings.aboutFooter}
          </p>
        </div>
      </ModalPaper>

      {/* Logout Confirmation */}
      <ModalConfirm
        show={confirmAction === 'logout'}
        title={mapStrings.logoutTitle}
        message={mapStrings.logoutMessage}
        confirmLabel={mapStrings.logoutConfirmLabel}
        cancelLabel={mapStrings.logoutCancelLabel}
        onConfirm={handleLogoutConfirmed}
        onCancel={() => setConfirmAction(null)}
        isLoading={isProcessing}
      />

      {/* Delete Account Confirmation */}
      <ModalConfirm
        show={confirmAction === 'delete'}
        title={mapStrings.deleteTitle}
        message={mapStrings.deleteMessage}
        confirmLabel={mapStrings.deleteConfirmLabel}
        cancelLabel={mapStrings.deleteCancelLabel}
        onConfirm={handleDeleteConfirmed}
        onCancel={() => setConfirmAction(null)}
        isLoading={isProcessing}
      />
    </div>
  );
}
