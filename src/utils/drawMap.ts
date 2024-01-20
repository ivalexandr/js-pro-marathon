import { TDrawMapParams } from '../types/draw-map-params.type';
import { calculateTileCoordinate } from './calculate-tile-coordinate';

const COL_LENGTH = 30;

export const drawMap = ({ data, ctx, img }: TDrawMapParams) => {
  data.forEach((tileNumber, index) => {
    const col = index % COL_LENGTH;
    const row = Math.floor(index / COL_LENGTH);
    const { x, y } = calculateTileCoordinate({
      tileNumber: tileNumber - 1,
      columns: 19,
      height: 32,
      width: 32,
      pixelGap: 1,
    });
    ctx.drawImage(img, x, y, 32, 32, col * 32, row * 32, 32, 32);
  });
};
