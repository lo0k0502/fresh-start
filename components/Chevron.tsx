import type { Direction, LiteralDirectionMap } from '@type/route.ts';

interface ChevronProps {
  direction: Direction;
  class?: string;
}

const directionMap: LiteralDirectionMap = {
  left: 'transform: rotate(180deg); transform-origin: center;',
  right: '',
  up: 'transform: rotate(270deg); transform-origin: center;',
  down: 'transform: rotate(90deg); transform-origin: center;',
};

export const Chevron = ({ direction, class: classNames }: ChevronProps) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='16'
      height='16'
      viewBox='0 0 16 16'
      class={classNames}
      stroke-width={6}
    >
      <path
        style={directionMap[direction]}
        stroke='currentColor'
        stroke-width='1'
        d='M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z'
      >
      </path>
    </svg>
  );
};
