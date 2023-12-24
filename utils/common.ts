import { Direction, DirectionKey } from '../types/route.ts';
import { byteQualifiers, byteUnit, directions } from '../constants/common.ts';

export const wait = (timeout: number) => new Promise<void>((resolve) => setTimeout(() => resolve(), timeout));

export const isLiteral = <T extends string>(target: string, literalArray: ReadonlyArray<T>): target is T => literalArray.includes(target as T);
export const isDirectionKey = (target: string): target is DirectionKey => isLiteral(target, ['KeyA', 'KeyD', 'KeyW', 'KeyS'] satisfies DirectionKey[]);

export const getOppositeDirection = (direction: Direction) => {
  const index = directions.indexOf(direction);
  return index % 2 ? directions[index - 1] : directions[index + 1];
};

export const random = (min: number, max: number) => Math.random() * (max - min) + min;

export const formatBytes = (bytes: number) => {
  const i = bytes && Math.floor(Math.log(bytes) / Math.log(byteUnit));
  return `${parseFloat((bytes / Math.pow(byteUnit, i)).toFixed(1))} ${byteQualifiers[i]}`;
};
