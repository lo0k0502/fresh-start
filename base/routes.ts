import { PageProps } from '$fresh/server.ts';
import { type JSX } from 'preact';
import type { Direction, Route, RouteMap } from '../types/route.ts';
import { getOppositeDirection } from '../utils/common.ts';
import Home from '../routes/index.tsx';
import MonitorLayout from '../routes/monitor/_layout.tsx';
import NASLayout from '../routes/nas/_layout.tsx';
import GameLayout from '../routes/game/_layout.tsx';
import FutureLayout from '../routes/future/_layout.tsx';

const routes: Route[] = [];

class RouteImpl implements Route {
  #path!: string;
  #component!: JSX.Element;
  #map!: Map<Direction, Route | undefined>;

  constructor(path: string, component: JSX.Element, relatedRoutes?: RouteMap) {
    this.#path = path;
    this.#component = component;
    this.#map = new Map(relatedRoutes);
    routes.push(this);
  }

  get path() {
    return this.#path;
  }

  get component() {
    return this.#component;
  }

  get availableDirections() {
    return Array.from(this.#map).filter(([_, route]) => route).map(([direction]) => direction);
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

    const routes: RouteMap = new Map();
    routes.set(getOppositeDirection(direction), this);

    const newRoute = new RouteImpl(path, component, routes);

    this.#map.set(direction, newRoute);
  }
}

const home = new RouteImpl('/', Home());

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

home.link('/monitor', MonitorLayout({ ...fooPageProps }), 'left');
home.link('/nas', NASLayout({ ...fooPageProps }), 'right');
home.link('/game', GameLayout({ ...fooPageProps }), 'up');
home.link('/future', FutureLayout({ ...fooPageProps }), 'down');

const routesMap = new Map(routes.map(({ path, component }) => [path, component]));
export { home, routesMap };
export default routes;
