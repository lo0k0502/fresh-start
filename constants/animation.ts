export const navigatingDuration = 300;
export const nasMenuDuration = 300;

const starSize = { min: 1, max: 4 };
const starAmount = 500;
export const starMetadata = Array.from({ length: starAmount }, () => ({
  top: Math.random() * 100,
  left: Math.random() * 100,
  size: (Math.random() * (starSize.max - starSize.min) + starSize.min) / 10,
  animationTime: Math.round(Math.random() * 4) + 10,
  animationDelay: Math.round(Math.random() * 20),
}));
