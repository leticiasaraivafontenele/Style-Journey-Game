import { useState } from 'react';
import { avatars } from '../utils/avatarHelper';

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
    <div className="flex flex-col items-center space-y-4 w-full">
      <label className="block text-sm font-medium text-gray-700">
        Escolha seu Avatar
      </label>
      
      <div className="flex items-center justify-center space-x-4 w-full">
        <button
          type="button"
          onClick={handlePrevious}
          disabled={disabled}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l transition-colors duration-200 disabled:bg-gray-200 disabled:cursor-not-allowed"
          aria-label="Avatar anterior"
        >
          ←
        </button>

        <div className="flex flex-col items-center space-y-2 min-w-[200px]">
          <div className="w-32 h-32 rounded-lg flex items-center justify-center overflow-hidden border-4 border-orange-500 ">
            <img
              src={currentAvatar.image}
              alt={currentAvatar.name}
              className="w-full h-full object-contain"
            />
          </div>
          <p className="text-sm font-medium text-gray-700">{currentAvatar.name}</p>
        </div>

        <button
          type="button"
          onClick={handleNext}
          disabled={disabled}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r transition-colors duration-200 disabled:bg-gray-200 disabled:cursor-not-allowed"
          aria-label="Próximo avatar"
        >
          →
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
                ? 'bg-orange-500 scale-125'
                : 'bg-gray-300 hover:bg-gray-400'
            } disabled:cursor-not-allowed`}
            aria-label={`Selecionar ${avatar.name}`}
          />
        ))}
      </div>
    </div>
  );
}
