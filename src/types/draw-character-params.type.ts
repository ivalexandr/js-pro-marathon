import { TCanvasParams } from './canvas-params.type';
import { TCharacterParams } from './character-params.type';

export type TDrawCharacterParams = {
  characterParams: TCharacterParams;
  canvasParams: TCanvasParams;
  deltaTime: number;
  img: HTMLImageElement;
};
