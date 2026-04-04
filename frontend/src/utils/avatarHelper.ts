import { character1Image, character2Image, character3Image, character4Image, character5Image, character6Image } from "../assets";

export interface Avatar {
  id: number;
  image: string;
}

export const avatars: Avatar[] = [
  { id: 1, image: character1Image },
  { id: 2, image: character2Image },
  { id: 3, image: character3Image },
  { id: 4, image: character4Image },
  { id: 5, image: character5Image },
  { id: 6, image: character6Image },
];

export const getAvatarById = (id: number): Avatar | undefined => {
  return avatars.find(avatar => avatar.id === id);
};

export const getAvatarImageById = (id: number): string | undefined => {
  const avatar = getAvatarById(id);
  return avatar?.image;
};
