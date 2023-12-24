import { PageProps } from '$fresh/server.ts';
import { type JSX } from 'preact';
import type { Direction, Route } from '@type/route.ts';
import Home from '@routes/index.tsx';
import MonitorLayout from '@routes/monitor/_layout.tsx';
import NASLayout from '@routes/nas/_layout.tsx';
import GameLayout from '@routes/game/_layout.tsx';
import FutureLayout from '@routes/future/_layout.tsx';
import StreamLayout from '@routes/stream/_layout.tsx';
import { getOppositeDirection } from '@utils/common.ts';

const routes: Route[] = [];

class RouteImpl implements Route {
  #path!: string;
  #component!: JSX.Element;
  #map!: Map<Direction, Route | undefined>;

  constructor(path: string, component: JSX.Element) {
    this.#path = path;
    this.#component = component;
    this.#map = new Map();
    routes.push(this);
  }

  get path() {
    return this.#path;
  }

  get component() {
    return this.#component;
  }

  get validDirections() {
    return Array.from(this.#map).filter(([_, route]) => route).map(([direction]) => direction);
  }

  isOccupied(direction: Direction) {
    return !!this.#map.get(direction);
  }

  getPath(direction: Direction) {
    return this.#map.get(direction)?.path;
  }

  getPathDirection(path: string) {
    for (const [key, value] of this.#map.entries()) {
      if (value?.path === path) return key;
    }
  }

  setMap(direction: Direction, route: Route) {
    this.#map.set(direction, route);
  }

  link(direction: Direction, route: Route | { path: string; component: JSX.Element }) {
    if (this.#map.get(direction)) throw new Error('This direction is occupied!');

    const opposite = getOppositeDirection(direction);

    const targetRoute = this.#isRoute(route) ? route : new RouteImpl(route.path, route.component);
    if (targetRoute.isOccupied(opposite)) throw new Error(`Target's direction is occupied! target: ${targetRoute.path}, this: ${this.path}`);

    targetRoute.setMap(opposite, this);
    this.#map.set(direction, targetRoute);

    return targetRoute;
  }

  // deno-lint-ignore no-explicit-any
  #isRoute(value: any): value is Route {
    return value && typeof value.link !== 'undefined';
  }
}

const fooPageProps: PageProps = {
  data: null,
  remoteAddr: { transport: 'tcp', hostname: '', port: 0 },
  url: new URL('http://foo'),
  basePath: '',
  route: '',
  pattern: '',
  destination: 'notFound',
  params: {},
  isPartial: false,
  state: {},
  config: {} as PageProps['config'],
  Component: () => null,
};

const home = new RouteImpl('/', Home({ ...fooPageProps, data: { stars: [] } }));
const game = new RouteImpl('/game', GameLayout(fooPageProps));
const nas = new RouteImpl('/nas', NASLayout(fooPageProps));
home.link('left', { path: '/monitor', component: MonitorLayout(fooPageProps) });
home.link('right', nas)
  .link('up', { path: '/stream', component: StreamLayout(fooPageProps) })
  .link('left', game);
home.link('down', { path: '/future', component: FutureLayout(fooPageProps) })
  .link('down', game)
  .link('down', home);
game.link('left', nas);

const routesMap = new Map(routes.map(({ path, component }) => [path, component]));
export { home, routesMap };
export default routes;
