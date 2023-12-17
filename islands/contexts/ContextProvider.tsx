import { WithChildren } from '../../types/common.ts';
import AnimationProvider from '../AnimationProvider.tsx';
import MaskProvider from './Mask.tsx';
import Router from './Router.tsx';

export default function ContextProvider({ children }: WithChildren) {
  return (
    <Router>
      <AnimationProvider>
        <MaskProvider>
          {children}
        </MaskProvider>
      </AnimationProvider>
    </Router>
  );
}
