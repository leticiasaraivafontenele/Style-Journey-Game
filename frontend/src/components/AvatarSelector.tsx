import { useState } from 'react';
import { avatars } from '../utils/avatarHelper';
import { avatarStrings } from '../strings/pt-br/avatar';
import { TiArrowBackOutline, TiArrowForwardOutline } from 'react-icons/ti';

interface AvatarSelectorProps {
  selectedAvatarId: number;
  onAvatarSelect: (avatarId: number) => void;
  disabled?: boolean;
}

export default function AvatarSelector({ selectedAvatarId, onAvatarSelect, disabled = false }: AvatarSelectorProps) {
  const [currentIndex, setCurrentIndex] = useState(
    avatars.findIndex(avatar => avatar.id === selectedAvatarId)
  );

  const handlePrevious = () => {
    const newIndex = currentIndex === 0 ? avatars.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    onAvatarSelect(avatars[newIndex].id);
  };

  const handleNext = () => {
    const newIndex = currentIndex === avatars.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    onAvatarSelect(avatars[newIndex].id);
  };

  const currentAvatar = avatars[currentIndex];

  return (
    <div className="flex flex-col items-center space-y-1 w-full">
      <label className="block text-sm font-medium text-gray-700">
        {avatarStrings.selectAvatarLabel}
      </label>
      
      <div className="flex items-center justify-center">
        <button
          type="button"
          onClick={handlePrevious}
          disabled={disabled}
          className="text-gray-800 hover:text-yellow-600 font-bold cursor-pointer disabled:cursor-not-allowed"
          aria-label={avatarStrings.previousAvatarButton}
        >
          <TiArrowBackOutline className="text-lg"/>
        </button>

        <div className="flex flex-col items-center space-y-2 mx-4">
          <div className="w-32 h-32 rounded-lg flex items-center justify-center overflow-hidden border-2 border-black ">
            <img
              src={currentAvatar.image}
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        <button
          type="button"
          onClick={handleNext}
          disabled={disabled}
          className="text-gray-800 hover:text-yellow-600 font-bold cursor-pointer disabled:cursor-not-allowed"
          aria-label={avatarStrings.nextAvatarButton}
        >
          <TiArrowForwardOutline className="text-lg" />
        </button>
      </div>

      <div className="flex space-x-2">
        {avatars.map((avatar, index) => (
          <button
            key={avatar.id}
            type="button"
            onClick={() => {
              setCurrentIndex(index);
              onAvatarSelect(avatar.id);
            }}
            disabled={disabled}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              index === currentIndex
                ? 'bg-yellow-600 scale-125'
                : 'bg-gray-300 hover:bg-gray-400'
            } cursor-pointer disabled:cursor-not-allowed`}
          />
        ))}
      </div>
    </div>
  );
}
