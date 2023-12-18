export interface Star {
  x: number;
  y: number;
  radius: number;
  xVelocity: number;
  yVelocity: number;
  color: string;
  blinkBaseDuration: number;
  blinkDurationCount: number;
  blinkDelayCount: number;
}

export interface WithStars {
  stars: Star[];
}
