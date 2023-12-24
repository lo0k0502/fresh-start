import type { DirectionKey, LiteralDirectionMap } from '@type/route.ts';

export const directionKeys: DirectionKey[] = ['KeyA', 'KeyD', 'KeyW', 'KeyS'];

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
