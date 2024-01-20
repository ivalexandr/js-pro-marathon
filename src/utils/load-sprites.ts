import { TLoadSpritesParams } from '../types/load-sprites-params.type';

export const loadSprites = (promises: TLoadSpritesParams) => {
  return Promise.all([...promises]);
};
