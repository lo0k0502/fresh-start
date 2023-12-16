import { type JSX } from 'preact';
import type { Direction, Route, RouteRecord } from './types/route.ts';

const routes: Route[] = [];
const directions: Direction[] = ['left', 'right', 'up', 'down'];

class RouteImpl implements Route {
  #path!: string;
  #component!: JSX.Element;
  #map!: Map<Direction, Route | undefined>;

  constructor(path: string, component: JSX.Element, relatedRoutes?: RouteRecord) {
    this.#path = path;
    this.#component = component;
    const routeEntries = relatedRoutes && Object.entries(relatedRoutes);
    this.#map = new Map(routeEntries) as Map<Direction, Route | undefined>;
    routes.push(this);
  }

  get path() {
    return this.#path;
  }

  get component() {
    return this.#component;
  }

  getPath(direction: Direction) {
    return this.#map.get(direction)?.path;
  }

  getPathDirection(path: string) {
    for (const [key, value] of this.#map.entries()) {
      if (value?.path === path) return key;
    }
  }

  link(path: string, component: JSX.Element, direction: Direction) {
    if (this.#map.get(direction)) throw new Error('This direction is occupied!');

    const index = directions.indexOf(direction);
    const opposite = index % 2 ? directions[index - 1] : directions[index + 1];
    const routes = {} as RouteRecord;
    routes[opposite] = this;

    const newRoute = new RouteImpl(path, component, routes);

    this.#map.set(direction, newRoute);
  }
}

export const createIndexRoute = (path: string, component: JSX.Element): Route => new RouteImpl(path, component);

export default routes;
