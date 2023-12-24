import type { WithChildren } from '@type/common.ts';
import AnimationProvider from '@islands/contexts/AnimationProvider.tsx';
import MaskProvider from '@islands/contexts/Mask.tsx';
import Router from '@islands/contexts/Router.tsx';
import WindowEventsProvider from '@islands/contexts/WindowEvents.tsx';

export default function ContextProvider({ children }: WithChildren) {
  return (
    <WindowEventsProvider>
      <Router>
        <AnimationProvider>
          <MaskProvider>
            {children}
          </MaskProvider>
        </AnimationProvider>
      </Router>
    </WindowEventsProvider>
  );
}
