import { wood2Image, gearImage } from '../assets';
import { getAvatarImageById } from '../utils/avatarHelper';

interface MapHUDProps {
  username: string | null;
  avatarId: number;
  level: number;
  onSettingsClick: () => void;
}

export default function MapHUD({ username, avatarId, level, onSettingsClick }: MapHUDProps) {
  const avatarImage = getAvatarImageById(avatarId);

  return (
    <>
      {/* Left: Player info label */}
      <div
        className="fixed top-4 left-4 flex items-center gap-2 px-3 py-2 rounded-xl shadow-lg"
        style={{
          zIndex: 50,
          backgroundImage: `url(${wood2Image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minWidth: '160px',
        }}
      >
        {avatarImage && (
          <img
            src={avatarImage}
            alt="avatar"
            className="w-12 h-12 object-contain rounded-md border-2 border-amber-900/50"
          />
        )}
        <div className="flex flex-col">
          {username && (
            <span className="text-amber-900 font-cinzel font-bold text-sm leading-tight drop-shadow-sm">
              {username}
            </span>
          )}
          <span className="text-amber-800 font-cinzel font-black text-base leading-tight drop-shadow-sm">
            LV: {level}
          </span>
        </div>
      </div>

      {/* Right: Settings button */}
      <button
        onClick={onSettingsClick}
        className="fixed top-4 right-4 w-14 h-14 flex items-center justify-center rounded-xl shadow-lg hover:brightness-110 active:scale-95 transition-all duration-150 cursor-pointer"
        style={{
          zIndex: 50,
          backgroundImage: `url(${wood2Image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        aria-label="Configurações"
      >
        <img src={gearImage} alt="configurações" className="w-8 h-8 object-contain" />
      </button>
    </>
  );
}
