import { type JSX } from 'preact';

export type Direction = 'left' | 'right' | 'up' | 'down';
export type DirectionKey = 'KeyA' | 'KeyD' | 'KeyW' | 'KeyS';
export type DirectionMap<T extends string, MapValue extends boolean = false> = MapValue extends true ? Record<Direction, T> : Record<T, Direction>;

export type RouteRecord = Record<Direction, Route | undefined>;
export type RoutePathRecord = Record<Direction, string | undefined>;

export interface Route {
  path: string;
  component: JSX.Element;
  getRoute(direction: Direction): Route | undefined;
  getRoutes(): RouteRecord;
  getPaths(): RoutePathRecord;
  link(path: string, component: JSX.Element, direction: Direction): void;
}
