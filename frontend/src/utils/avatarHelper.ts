import {
  CharacterSoldierBoyImage,
  CharacterSoldierGirlImage,
  CharacterElfBoyImage,
  CharacterElfGirlImage,
  CharacterKnightBoyImage,
  CharacterKnightGirlImage,
} from '../assets';

export interface Avatar {
  id: number;
  name: string;
  image: string;
}

export const avatars: Avatar[] = [
  { id: 1, name: 'Soldier Boy', image: CharacterSoldierBoyImage },
  { id: 2, name: 'Soldier Girl', image: CharacterSoldierGirlImage },
  { id: 3, name: 'Elf Boy', image: CharacterElfBoyImage },
  { id: 4, name: 'Elf Girl', image: CharacterElfGirlImage },
  { id: 5, name: 'Knight Boy', image: CharacterKnightBoyImage },
  { id: 6, name: 'Knight Girl', image: CharacterKnightGirlImage },
];

export const getAvatarById = (id: number): Avatar | undefined => {
  return avatars.find(avatar => avatar.id === id);
};

export const getAvatarImageById = (id: number): string | undefined => {
  const avatar = getAvatarById(id);
  return avatar?.image;
};
