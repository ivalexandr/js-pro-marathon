import './style.css';
import mWalkerPath from './assets/M-walk.png';
import { TCanvasParams } from './types/canvas-params.type';
import { Direction } from './enums/direction.enum';
import { Keys } from './enums/keys.enum';
import { TCharacterParams } from './types/character-params.type';

const canvas = document.getElementById('game') as HTMLCanvasElement | null;

if (!canvas) throw new Error('Canvas not found');

const canvasParams: TCanvasParams = {
  width: canvas.width,
  height: canvas.height,
  ctx: canvas.getContext('2d'),
};

const characterParams: TCharacterParams = {
  x: 0,
  y: 0,
  keyPress: false,
  direction: Direction.DOWN,
};

const FRAMES = 3;
const COEFFICIENT = 48.5;

let lastTimeUpdate = 0;
let step = 0;
const img = new Image();
img.src = mWalkerPath;

const animate = (timestamp: number) => {
  const deltaTime = timestamp - lastTimeUpdate;
  const img = new Image();
  img.src = mWalkerPath;

  img.addEventListener('load', () => {
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
      } else if (characterParams.x >= canvasParams.width - 64) {
        characterParams.x = canvasParams.width - 64;
      }

      if (characterParams.y <= 0) {
        characterParams.y = 0;
      } else if (characterParams.y >= canvasParams.height - 64) {
        characterParams.y = canvasParams.height - 64;
      }
    }
    if (!canvasParams.ctx) throw new Error('No canvas context');
    canvasParams.ctx.clearRect(0, 0, canvasParams.width, canvasParams.height);
    canvasParams.ctx.drawImage(
      img,
      COEFFICIENT * Math.floor(step),
      COEFFICIENT * characterParams.direction,
      COEFFICIENT,
      COEFFICIENT,
      characterParams.x,
      characterParams.y,
      64,
      64
    );
  });

  lastTimeUpdate = timestamp;
  requestAnimationFrame(animate);
};

requestAnimationFrame(animate);

const keyDownHandler = (event: KeyboardEvent) => {
  characterParams.keyPress = true;
  switch (event.key) {
    case Keys.ArrowUp:
      characterParams.direction = Direction.UP;
      break;
    case Keys.ArrowRight:
      characterParams.direction = Direction.RIGHT;
      break;
    case Keys.ArrowDown:
      characterParams.direction = Direction.DOWN;
      break;
    case Keys.ArrowLeft:
      characterParams.direction = Direction.LEFT;
      break;
  }
};

const keyUpHandler = () => {
  characterParams.keyPress = false;
  characterParams.direction = Direction.DOWN;
};

document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);
