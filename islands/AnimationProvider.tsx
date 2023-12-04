import { WithChildren } from '../types/common.ts';
import { useLock, useThrottle } from '../utils/mod.ts';

const useAnimation = () => {
  const rippleLock = useLock();

  const footprintsEffect = (e: MouseEvent) => {
    const dot = document.createElement('img');

    dot.classList.add('footprint');
    dot.src = 'iconmonstr-star-3.svg';
    dot.style.left = `${e.clientX}px`;
    dot.style.top = `${e.clientY}px`;
    document.body.append(dot);

    setTimeout(() => {
      dot.style.opacity = '0';
      setTimeout(() => dot.remove(), 1000);
    }, 1);
  };

  const rippleEffect = rippleLock.guard((e: MouseEvent) => {
    const ripple = document.createElement('span');

    ripple.className = 'ripple';
    ripple.style.left = `${e.clientX}px`;
    ripple.style.top = `${e.clientY}px`;
    document.body.append(ripple);

    setTimeout(() => ripple.remove(), 200);
  });

  const rippleReverseEffect = rippleLock.guard((e: MouseEvent) => {
    const ripple = document.createElement('span');

    ripple.className = 'ripple-reverse';
    ripple.style.left = `${e.clientX}px`;
    ripple.style.top = `${e.clientY}px`;
    document.body.append(ripple);

    setTimeout(() => ripple.remove(), 200);
  });

  return {
    footprintsEffect,
    rippleEffect,
    rippleReverseEffect,
  };
};

export default function AnimationProvider({ children }: WithChildren) {
  const animation = useAnimation();

  window.onmousemove = useThrottle(animation.footprintsEffect);
  window.onmouseup = animation.rippleEffect;
  window.onmousedown = animation.rippleReverseEffect;

  return <>{children}</>;
}
