import { computed, useSignal } from '@preact/signals';
import { createContext, type JSX } from 'preact';
import { useContext, useEffect, useMemo, useRef } from 'preact/hooks';
import type { WithChildren } from '../../types/common.ts';
import type { Direction, Route } from '../../types/route.ts';
import type { PartialKeyboardEventRule } from '../../types/windowEvents.ts';
import routes, { createIndexRoute, routesMap } from '../../routes.ts';
import { useWindowEvents } from './WindowEvents.tsx';
import { useAsyncThrottle } from '../../hooks/useThrottle.ts';
import { directionKeys, keyDirectionMap } from '../../constants/route.ts';
import { navigatingDuration } from '../../constants/animation.ts';
import { isDirectionKey, wait } from '../../utils/common.ts';
import NavigationIndicator from '../components/NavigationIndicator.tsx';
import Home from '../../routes/index.tsx';
import NAS from '../../routes/nas/index.tsx';
import Game from '../../routes/game/index.tsx';
import Monitor from '../../routes/monitor/index.tsx';
import Future from '../../routes/future/index.tsx';

interface RouterContext {
  navigate: (path: string) => void;
  currentRoute: Route;
}

const home = createIndexRoute('/', <Home />);
home.link('/monitor', <Monitor />, 'left');
home.link('/nas', <NAS />, 'right');
home.link('/game', <Game />, 'up');
home.link('/future', <Future />, 'down');

const RouterContext = createContext<RouterContext>({
  navigate: () => {},
  currentRoute: home,
});

export const useRouter = () => useContext(RouterContext);

export default function Router({ children }: WithChildren) {
  const { setKeyEvent } = useWindowEvents();
  const navigating = useSignal(false);
  const showIndicator = useSignal(false);
  const to = useRef<JSX.Element | null>(null);
  const direction = useRef<Direction | undefined>();

  const currentRoute = useMemo(() => routes.value.find(({ path }) => path !== '/' && location?.pathname.startsWith(path)) || home, []);

  const transitionClass = computed(() => navigating.value ? `slide-${direction.current}` : 'w-screen h-screen');

  const navigate = useAsyncThrottle(async (path: string) => {
    if (path !== '/' && location.pathname.startsWith(path)) return;
    if (!routesMap.value.has(path)) {
      location.pathname = path;
      return;
    }

    const toDirection = currentRoute.getPathDirection(path);
    if (!toDirection) return;

    to.current = routesMap.value.get(path)!;
    direction.current = toDirection;
    navigating.value = true;

    await wait(navigatingDuration);

    location.pathname = path;
  });

  const displayIndicator = useAsyncThrottle(async () => {
    showIndicator.value = true;
    await wait(3000);
    showIndicator.value = false;
  });

  useEffect(() => {
    const displayIndicatorRule: PartialKeyboardEventRule = {
      code: 'KeyI',
      altKey: true,
    };

    setKeyEvent(displayIndicatorRule, () => displayIndicator());

    for (const key of directionKeys) {
      const navigateRule: PartialKeyboardEventRule = {
        code: key,
        altKey: true,
      };

      setKeyEvent(navigateRule, (e) => {
        if (!isDirectionKey(e.code)) return;

        const navigatePath = currentRoute.getPath(keyDirectionMap[e.code]);
        if (!navigatePath) return displayIndicator();

        navigate(navigatePath);
      });
    }
  }, []);

  return (
    <RouterContext.Provider value={{ navigate, currentRoute }}>
      <div class={transitionClass.value} style={{ position: 'absolute', display: 'flex', transition: `transform ${navigatingDuration}ms ease-in-out` }}>
        <div class='relative w-screen h-screen'>
          <NavigationIndicator show={showIndicator.value} directions={currentRoute.availableDirections}>
            {children}
          </NavigationIndicator>
        </div>
        {navigating.value && (
          <div class='relative w-screen h-screen'>
            {to.current}
          </div>
        )}
      </div>
    </RouterContext.Provider>
  );
}
