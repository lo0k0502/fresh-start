import { type JSX } from 'preact';
import type { WithChildren } from '@type/common.ts';
import type { Direction, DirectionMap } from '@type/route.ts';
import { Arrow } from '@components/Arrow.tsx';
import { isMac } from '@constants/common.ts';
import { directionKeyMap } from '@constants/route.ts';

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

export const NavigationIndicator = ({ children, show, directions }: NavigationIndicatorProps) => {
  return (
    <>
      {show && directions.map((direction) => (
        <div
          style={{
            position: 'absolute',
            opacity: '80%',
            zIndex: 5,
            animation: 'blink 1s ease-in-out infinite',
            ...indicatorStyleMap[direction],
          }}
        >
          <span style={kbdStyleMap[direction]} class='absolute flex'>
            <kbd class={`indicator-kbd ${isMac ? `leading-6 text-2xl` : ''}`}>
              {isMac ? '⌥' : 'Alt'}
            </kbd>
            <span class='mx-1'>+</span>
            <kbd class='indicator-kbd'>{directionKeyMap[direction].slice(-1)}</kbd>
          </span>

          <Arrow direction={direction} />
        </div>
      ))}
      {children}
    </>
  );
};
