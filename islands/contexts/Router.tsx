import { computed, useSignal } from '@preact/signals';
import { createContext, type JSX } from 'preact';
import { useContext, useMemo, useRef } from 'preact/hooks';
import type { WithChildren } from '../../types/common.ts';
import type { Direction, DirectionKey, Route } from '../../types/route.ts';
import routes, { createIndexRoute } from '../../routes.ts';
import { useAsyncThrottle } from '../../hooks/useThrottle.ts';
import { directionMap } from '../../constants/route.ts';
import Home from '../../routes/index.tsx';
import NAS from '../../routes/nas/index.tsx';
import Game from '../../routes/game/index.tsx';
import { wait } from '../../utils/common.ts';
import { navigatingTransition } from '../../constants/animation.ts';

interface RouterContext {
  navigate: (path: string) => void;
  currentRoute: Route;
}

const home = createIndexRoute('/', <Home />);
home.link('/nas', <NAS />, 'right');
home.link('/game', <Game />, 'up');

const reservedRoutes = routes.reduce<Record<string, JSX.Element>>((prev, { path, component }) => ({ ...prev, [path]: component }), {});

const RouterContext = createContext<RouterContext>({
  navigate: () => {},
  currentRoute: home,
});

export const useRouter = () => useContext(RouterContext);

export default function Router({ children }: WithChildren) {
  const navigating = useSignal(false);
  const to = useRef<JSX.Element | null>(null);
  const direction = useRef<Direction | undefined>();

  const currentRoute = useMemo(() => {
    return routes.find(({ path }) => path !== '/' && location?.pathname.startsWith(path)) || home;
  }, []);

  const transitionClass = computed(() => navigating.value ? `slide-${direction.current}` : 'w-screen h-screen');

  const navigate = useAsyncThrottle(async (path: string) => {
    if (path === location.pathname) return;
    if (!Object.keys(reservedRoutes).includes(path)) {
      location.pathname = path;
      return;
    }

    if (currentRoute.path === path) return;

    const toDirection = Object.entries(currentRoute.getPaths()).find(([_, targetPath]) => path === targetPath)?.[0] as Direction | undefined;
    if (!toDirection) return;

    to.current = reservedRoutes[path];
    direction.current = toDirection;
    navigating.value = true;
    await wait(navigatingTransition);
    location.pathname = path;
  });

  window.onkeyup = (e) => {
    if (!e.altKey) return;

    const directionKeys = ['KeyA', 'KeyD', 'KeyW', 'KeyS'];
    if (!directionKeys.includes(e.code)) return;

    const navigatePath = currentRoute.getPaths()[directionMap[e.code as DirectionKey]];
    if (!navigatePath) return;

    navigate(navigatePath);
  };

  return (
    <RouterContext.Provider value={{ navigate, currentRoute }}>
      <div class={transitionClass.value} style={{ position: 'absolute', display: 'flex', transition: `transform ${navigatingTransition}ms linear` }}>
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
