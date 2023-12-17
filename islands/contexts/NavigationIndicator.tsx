import { type JSX } from 'preact';
import type { WithChildren } from '../../types/common.ts';
import type { Direction, DirectionMap } from '../../types/route.ts';
import Arrow from '../components/Arrow.tsx';
import { directionKeyMap } from '../../constants/route.ts';

interface NavigationIndicatorProps extends WithChildren {
  show: boolean;
  directions: Direction[];
}

const indicatorStyleMap: DirectionMap<JSX.CSSProperties> = {
  left: { top: '50%', transform: 'translate(50%, -50%)' },
  right: { top: '50%', right: '0px', transform: 'translate(-50%, -50%)' },
  up: { left: '50%', transform: 'translate(-50%, 50%)' },
  down: { left: '50%', bottom: '0px', transform: 'translate(-50%, -50%)' },
};

const kbdStyleMap: DirectionMap<JSX.CSSProperties> = {
  left: { top: '50%', right: '0.25rem', transform: 'translate(0, -50%)' },
  right: { top: '50%', left: '0.25rem', transform: 'translate(0, -50%)' },
  up: { left: '50%', top: '50%', transform: 'translate(-50%, 0)' },
  down: { left: '50%', bottom: '50%', transform: 'translate(-50%, 0)' },
};

export default function NavigationIndicator({ children, show, directions }: NavigationIndicatorProps) {
  return (
    <>
      {show && directions.map((direction) => (
        <div style={{ position: 'absolute', opacity: '80%', zIndex: 10, animation: 'blink 1s ease-in-out infinite', ...indicatorStyleMap[direction] }}>
          <span style={kbdStyleMap[direction]} class='absolute'>
            <kbd class='indicator-kbd font-semibold'>Alt</kbd>
            <span class='mx-1'>+</span>
            <kbd class='indicator-kbd font-semibold'>{directionKeyMap[direction].slice(-1)}</kbd>
          </span>

          <Arrow direction={direction} />
        </div>
      ))}
      {children}
    </>
  );
}
