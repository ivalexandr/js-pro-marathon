import { Direction } from '../enums/direction.enum';
import { TDrawCharacterParams } from '../types/draw-character-params.type';

const FRAMES = 3;
const COEFFICIENT = 48;
let step = 0;

export const drawCharacter = ({
  characterParams,
  canvasParams,
  deltaTime,
  img,
}: TDrawCharacterParams) => {
  if (characterParams.keyPress) {
    step = (step + 0.01 * deltaTime) % FRAMES;

    switch (characterParams.direction) {
      case Direction.UP:
        characterParams.y -= 0.1 * deltaTime;
        break;
      case Direction.RIGHT:
        characterParams.x += 0.1 * deltaTime;
        break;
      case Direction.DOWN:
        characterParams.y += 0.1 * deltaTime;
        break;
      case Direction.LEFT:
        characterParams.x -= 0.1 * deltaTime;
        break;
    }

    if (characterParams.x <= 0) {
      characterParams.x = 0;
    } else if (characterParams.x >= canvasParams.width - 32) {
      characterParams.x = canvasParams.width - 32;
    }

    if (characterParams.y <= 0) {
      characterParams.y = 0;
    } else if (characterParams.y >= canvasParams.height - 32) {
      characterParams.y = canvasParams.height - 32;
    }
  }

  canvasParams.ctx.drawImage(
    img,
    COEFFICIENT * Math.floor(step),
    COEFFICIENT * characterParams.direction,
    COEFFICIENT,
    COEFFICIENT,
    characterParams.x,
    characterParams.y,
    32,
    32
  );
};
