import { type JSX } from 'preact';

export type Direction = 'left' | 'right' | 'up' | 'down';
export type DirectionKey = 'KeyA' | 'KeyD' | 'KeyW' | 'KeyS';
export type DirectionMap<T = string> = Record<Direction, T>;
export type LiteralDirectionMap<T extends string = string, MapDirection extends boolean = false> = MapDirection extends true ? Record<T, Direction> : Record<Direction, T>;

export type RouteMap = Map<Direction, Route>;
export type RoutesMap = Map<string, JSX.Element>;

export interface Route {
  path: string;
  component: JSX.Element;
  validDirections: Direction[];
  isOccupied(direction: Direction): boolean;
  getPath(direction: Direction): string | undefined;
  getPathDirection(path: string): Direction | undefined;
  setMap(direction: Direction, route: Route): void;
  link(direction: Direction, route: Route): Route;
  link(direction: Direction, route: { path: string; component: JSX.Element }): Route;
}
