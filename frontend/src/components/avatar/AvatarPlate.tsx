import { wood2Image, gearImage, wood1Image } from '../../assets';
import { getAvatarImageById } from '../../utils/avatarHelper';
import { mapStrings } from '../../strings/pt-br/map';

interface AvatarPlateProps {
  username: string | null;
  avatarId: number;
  level: number;
  onSettingsClick: () => void;
}

export default function AvatarPlate({ username, avatarId, level, onSettingsClick }: AvatarPlateProps) {
  const avatarImage = getAvatarImageById(avatarId);

  return (
    <>
      {/* Left: Player info label */}
      <div
        className="fixed top-4 left-4 flex items-center gap-2 px-3 py-2 rounded-xl shadow-lg"
        style={{
          zIndex: 50,
          backgroundImage: `url(${wood1Image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minWidth: '200px',
          minHeight: '110px',
        }}
      >
        {avatarImage && (
          <img
            src={avatarImage}
            alt={mapStrings.avatarAlt}
            className="w-16 h-16 object-contain"
          />
        )}
        <div className="flex flex-col bg-yellow-600/20 p-3 rounded-md">
          {username && (
            <span className="text-black font-start font-bold text-base leading-tight drop-shadow-sm max-w-30 truncate">
              {username}
            </span>
          )}
          <span className="text-black font-start font-black text-xl leading-tight drop-shadow-sm max-w-30 truncate">
            {mapStrings.levelPrefix} {level}
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
          minWidth: '120px',
          minHeight: '90px',
        }}
        aria-label={mapStrings.settingsAriaLabel}
      >
        <img src={gearImage} alt={mapStrings.settingsAlt} className="w-13 h-13 object-contain" />
      </button>
    </>
  );
}
