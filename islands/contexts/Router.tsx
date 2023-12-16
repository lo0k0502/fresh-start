import { computed, useSignal } from '@preact/signals';
import { createContext, type JSX } from 'preact';
import { useContext, useMemo, useRef } from 'preact/hooks';
import type { WithChildren } from '../../types/common.ts';
import type { Direction, DirectionKey, Route } from '../../types/route.ts';
import routes, { createIndexRoute } from '../../routes.ts';
import { useThrottle } from '../../hooks/useThrottle.ts';
import { directionMap } from '../../constants/route.ts';
import Home from '../../routes/index.tsx';
import NAS from '../../routes/nas/index.tsx';
import Game from '../../routes/game/index.tsx';

interface RouterContext {
  navigate: (path: string) => void;
  current: Route;
}

const home = createIndexRoute('/', <Home />);
home.link('/nas', <NAS />, 'right');
home.link('/game', <Game />, 'up');

const reservedRoutes = routes.reduce<Record<string, JSX.Element>>((prev, { path, component }) => ({ ...prev, [path]: component }), {});

const RouterContext = createContext<RouterContext>({
  navigate: () => {},
  current: home,
});

export const useRouter = () => useContext(RouterContext);

export default function Router({ children }: WithChildren) {
  const nav = useSignal(false);
  const to = useRef<JSX.Element | null>(null);
  const direction = useRef<Direction | undefined>();

  const current = useMemo(() => {
    return routes.filter(({ path }) => path !== '/').find(({ path }) => location?.pathname.startsWith(path)) || home;
  }, []);

  const divClass = computed(() => nav.value ? `slide-${direction.current}` : 'w-screen h-screen');

  const navigate = useThrottle((path: string) => {
    if (!Object.keys(reservedRoutes).includes(path)) return location.pathname = path;

    if (current.path === path) return location.pathname = path;

    const toDirection = Object.entries(current.getPaths()).find(([_, targetPath]) => path === targetPath)?.[0] as Direction | undefined;
    if (!toDirection) return;

    to.current = reservedRoutes[path];
    direction.current = toDirection;
    nav.value = true;
    setTimeout(() => location.pathname = path, 1000);
  }, { timeout: 1000 });

  window.onkeyup = (e) => {
    if (!e.altKey) return;

    const directionKeys = ['KeyA', 'KeyD', 'KeyW', 'KeyS'];
    if (!directionKeys.includes(e.code)) return;

    const navigatePath = current.getPaths()[directionMap[e.code as DirectionKey]];
    if (!navigatePath) return;

    navigate(navigatePath);
  };

  return (
    <RouterContext.Provider value={{ navigate, current }}>
      <div class={`absolute flex ${divClass.value}`}>
        <div>
          {children}
        </div>
        <div>
          {to.current}
        </div>
      </div>
    </RouterContext.Provider>
  );
}
