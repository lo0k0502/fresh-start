import { computed, useSignal } from '@preact/signals';
import { createContext, type JSX } from 'preact';
import { useContext, useMemo, useRef } from 'preact/hooks';
import type { WithChildren } from '../../types/common.ts';
import type { Direction, DirectionKey, Route } from '../../types/route.ts';
import routes, { createIndexRoute } from '../../routes.ts';
import { useAsyncThrottle } from '../../hooks/useThrottle.ts';
import { directionMap } from '../../constants/route.ts';
import { navigatingDuration } from '../../constants/animation.ts';
import { isLiteral, wait } from '../../utils/common.ts';
import Home from '../../routes/index.tsx';
import NAS from '../../routes/nas/index.tsx';
import Game from '../../routes/game/index.tsx';

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

  const currentRoute = useMemo(() => routes.find(({ path }) => path !== '/' && location?.pathname.startsWith(path)) || home, []);

  const transitionClass = computed(() => navigating.value ? `slide-${direction.current}` : 'w-screen h-screen');
  const toDisplay = computed(() => navigating.value ? 'block' : 'hidden');

  const navigate = useAsyncThrottle(async (path: string) => {
    if (path !== '/' && location.pathname.startsWith(path)) return;
    if (!Object.keys(reservedRoutes).includes(path)) {
      location.pathname = path;
      return;
    }

    const toDirection = currentRoute.getPathDirection(path);
    if (!toDirection) return;

    to.current = reservedRoutes[path];
    direction.current = toDirection;
    navigating.value = true;

    await wait(navigatingDuration);

    location.pathname = path;
  });

  window.onkeyup = (e) => {
    if (!e.altKey) return;

    const directionKeys: DirectionKey[] = ['KeyA', 'KeyD', 'KeyW', 'KeyS'];
    if (!isLiteral(e.code, directionKeys)) return;

    const navigatePath = currentRoute.getPath(directionMap[e.code]);
    if (!navigatePath) return;

    navigate(navigatePath);
  };

  return (
    <RouterContext.Provider value={{ navigate, currentRoute }}>
      <div class={transitionClass.value} style={{ position: 'absolute', display: 'flex', transition: `transform ${navigatingDuration}ms linear` }}>
        <div class='w-screen h-screen'>
          {children}
        </div>
        <div class={`w-screen h-screen ${toDisplay.value}`}>
          {to.current}
        </div>
      </div>
    </RouterContext.Provider>
  );
}
