import { type JSX } from 'preact';
import type { Direction, Route, RoutePathRecord, RouteRecord } from './types/route.ts';

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

  getRoute(direction: Direction) {
    return this.#map.get(direction);
  }

  getRoutes() {
    return Object.fromEntries(this.#map) as RouteRecord;
  }

  getPaths() {
    const routeArray = Array.from(this.#map).map((entry) => [entry[0], entry[1]?.path] as const);
    return Object.fromEntries(routeArray) as RoutePathRecord;
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
