import { Direction } from '../enums/direction.enum';

export type TCharacterParams = {
  x: number;
  y: number;
  keyPress: boolean;
  direction: Direction;
};
