import { type JSX } from 'preact';

export type Direction = 'left' | 'right' | 'up' | 'down';
export type DirectionKey = 'KeyA' | 'KeyD' | 'KeyW' | 'KeyS';
export type DirectionMap<T extends string, MapValue extends boolean = false> = MapValue extends true ? Record<Direction, T> : Record<T, Direction>;

export type RouteRecord = Record<Direction, Route | undefined>;

export interface Route {
  path: string;
  component: JSX.Element;
  getPath(direction: Direction): string | undefined;
  getPathDirection(path: string): Direction | undefined;
  link(path: string, component: JSX.Element, direction: Direction): void;
}
