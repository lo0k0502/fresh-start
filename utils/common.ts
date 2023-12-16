import { DirectionKey } from '../types/route.ts';

export const wait = (timeout: number) => new Promise<void>((resolve) => setTimeout(() => resolve(), timeout));

export const isLiteral = <T extends string>(target: string, literalArray: ReadonlyArray<T>): target is T => literalArray.includes(target as T);
export const isDirectionKey = (target: string): target is DirectionKey => isLiteral(target, ['KeyA', 'KeyD', 'KeyW', 'KeyS'] satisfies DirectionKey[]);
