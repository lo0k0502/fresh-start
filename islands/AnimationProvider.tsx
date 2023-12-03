import { WithChildren } from '../types/common.ts';
import { useThrottle } from '../utils/mod.ts';

const footprintsEffect = (e: MouseEvent) => {
  const dot = document.createElement('span');

  dot.className = 'dot';
  dot.style.left = `${e.clientX}px`;
  dot.style.top = `${e.clientY}px`;
  document.body.append(dot);

  setTimeout(() => {
    dot.style.opacity = '0';
    setTimeout(() => dot.remove(), 1000);
  }, 1);
};

const rippleEffect = (e: MouseEvent) => {
  const ripple = document.createElement('span');

  ripple.className = 'ripple';
  ripple.style.left = `${e.clientX}px`;
  ripple.style.top = `${e.clientY}px`;
  document.body.append(ripple);

  setTimeout(() => ripple.remove(), 200);
};

export default function AnimationProvider({ children }: WithChildren) {
  window.onmousemove = useThrottle(footprintsEffect);
  window.onclick = rippleEffect;

  return <>{children}</>;
}
