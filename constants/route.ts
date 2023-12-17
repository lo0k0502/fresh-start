import type { DirectionKey, LiteralDirectionMap } from '../types/route.ts';

export const keyDirectionMap: LiteralDirectionMap<DirectionKey, true> = {
  KeyA: 'left',
  KeyD: 'right',
  KeyW: 'up',
  KeyS: 'down',
};

export const directionKeyMap: LiteralDirectionMap<DirectionKey> = {
  left: 'KeyA',
  right: 'KeyD',
  up: 'KeyW',
  down: 'KeyS',
};
