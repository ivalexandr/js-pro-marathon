import { TCalculateTileCoordinate } from '../types/calculate-tile-coordinate-params.type';

export const calculateTileCoordinate = ({
  tileNumber = 0,
  columns,
  width,
  height,
  pixelGap = 0,
}: TCalculateTileCoordinate): { x: number; y: number } => {
  const x = (tileNumber % columns) * (width + pixelGap);
  const y = Math.floor(tileNumber / columns) * (height + pixelGap);

  return { x, y };
};
