import { createContext, type JSX } from 'preact';
import { WithChildren } from '../types/common.ts';
import { useSignal } from '@preact/signals';
import NAS from '../routes/nas/index.tsx';
import { useContext, useRef } from 'preact/hooks';

interface RouterContext {
  navigate: (path: string) => void;
}

const reservedRoutes: Record<string, JSX.Element> = {
  '/nas': <NAS />,
};

const RouterContext = createContext<RouterContext>({
  navigate: () => {},
});

export const useRouter = () => useContext(RouterContext);

export default function Router({ children }: WithChildren) {
  const nav = useSignal(false);
  const to = useRef<JSX.Element | null>(null);

  const navigate = (path: string) => {
    if (!Object.keys(reservedRoutes).includes(path)) return location.pathname = path;

    to.current = reservedRoutes[path];
    nav.value = true;
    setTimeout(() => location.pathname = path, 1000);
  };

  window.onclick = () => {
    navigate('/nas');
  };

  return (
    <RouterContext.Provider value={{ navigate }}>
      <div class={`h-screen flex ${nav.value ? 'w-2screen -translate-x-1/2' : 'w-screen'}`}>
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
