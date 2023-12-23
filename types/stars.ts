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

export interface ShootingStar {
  x: number;
  y: number;
  length: number;
  angle: number;
  speed: number;
  size: number;
  maxLength: number;
  lengthCount: number;
}

export interface WithStars {
  stars: Star[];
}
