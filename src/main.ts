import './style.css';
import mWalkerPath from './assets/M-walk.png';
import durotarPath from './assets/durotar.png';
import worldMapJson from './assets/world-map.json';
import { TCanvasParams } from './types/canvas-params.type';
import { Direction } from './enums/direction.enum';
import { Keys } from './enums/keys.enum';
import { TCharacterParams } from './types/character-params.type';
import { loadSprites } from './utils/load-sprites';
import { loadImage } from './utils/load-image';
import { drawMap } from './utils/drawMap';
import { drawCharacter } from './utils/draw-character';

const canvas = document.getElementById('game') as HTMLCanvasElement | null;
const loader = document.querySelector('h3') as HTMLHeadElement;

if (!canvas) throw new Error('Canvas not found');

const canvasParams: TCanvasParams = {
  width: canvas.width,
  height: canvas.height,
  ctx: canvas.getContext('2d') as CanvasRenderingContext2D,
};

if (!canvasParams.ctx) throw new Error('Canvas context not found');

const characterParams: TCharacterParams = {
  x: 0,
  y: 0,
  keyPress: false,
  direction: Direction.DOWN,
};

loadSprites([loadImage(mWalkerPath), loadImage(durotarPath)]).then(
  ([mWalker, durotar]) => {
    loader.remove();
    let lastTimeUpdate = 0;

    const { layers } = worldMapJson;
    const { data: mainLayer } = layers[0];
    const { data: forestLayer } = layers[1];

    const animate = (timestamp: number) => {
      const deltaTime = timestamp - lastTimeUpdate;

      drawMap({
        data: mainLayer,
        ctx: canvasParams.ctx,
        img: durotar,
      });

      drawCharacter({
        characterParams,
        canvasParams,
        deltaTime,
        img: mWalker,
      });

      drawMap({
        data: forestLayer,
        ctx: canvasParams.ctx,
        img: durotar,
      });

      lastTimeUpdate = timestamp;
      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }
);

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
