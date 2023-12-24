import type { Direction, LiteralDirectionMap } from '../types/route.ts';

interface ArrowProps {
  direction: Direction;
  class?: string;
}

const directionMap: LiteralDirectionMap = {
  left: 'transform: rotate(180deg); transform-origin: center;',
  right: '',
  up: 'transform: rotate(270deg); transform-origin: center;',
  down: 'transform: rotate(90deg); transform-origin: center;',
};

export default function Arrow({ direction, class: classNames }: ArrowProps) {
  return (
    <svg
      viewBox='0 0 155.139 155.139'
      xml:space='preserve'
      class={`w-24 h-24 ${classNames}`}
    >
      <polygon
        style={`${directionMap[direction]}`}
        class='fill-slate-300'
        points='155.139,77.566 79.18,1.596 79.18,45.978 0,45.978 0,109.155 79.18,109.155 79.18,153.542'
      />
    </svg>
  );
}
