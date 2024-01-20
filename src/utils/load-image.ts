export const loadImage = (src: string): Promise<HTMLImageElement> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = src;
    img.addEventListener('load', () => resolve(img));
  });
};
