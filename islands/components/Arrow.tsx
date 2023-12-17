import { Direction, LiteralDirectionMap } from '../../types/route.ts';

interface ArrowProps {
  direction: Direction;
}

const directionMap: LiteralDirectionMap = {
  left: 'rotate(180, 77.5695, 77.5695)',
  right: '',
  up: 'rotate(-90, 77.5695, 77.5695)',
  down: 'rotate(90, 77.5695, 77.5695)',
};

export default function Arrow({ direction }: ArrowProps) {
  return (
    <svg height='6rem' width='6rem' version='1.1' id='Capa_1' viewBox='0 0 155.139 155.139' xml:space='preserve'>
      <g transform={directionMap[direction]}>
        <g>
          <polygon
            style='fill:#fff;'
            points='155.139,77.566 79.18,1.596 79.18,45.978 0,45.978 0,109.155 79.18,109.155 79.18,153.542'
          />
        </g>
      </g>
    </svg>
  );
}
