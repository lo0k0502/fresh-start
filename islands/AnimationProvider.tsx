import { WithChildren } from '../types/common.ts';
import { useLock } from '../utils/mod.ts';

const useAnimation = () => {
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
    }, 50);
  };

  const rippleEffect = (e: MouseEvent) => {
    const ripple = document.createElement('span');

    ripple.className = 'ripple';
    ripple.style.left = `${e.clientX}px`;
    ripple.style.top = `${e.clientY}px`;
    document.body.append(ripple);

    setTimeout(() => ripple.remove(), 200);
  };

  const rippleReverseEffect = (e: MouseEvent) => {
    const ripple = document.createElement('span');

    ripple.className = 'ripple-reverse';
    ripple.style.left = `${e.clientX}px`;
    ripple.style.top = `${e.clientY}px`;
    document.body.append(ripple);

    setTimeout(() => ripple.remove(), 200);
  };

  return {
    footprintsEffect,
    rippleEffect,
    rippleReverseEffect,
  };
};

export default function AnimationProvider({ children }: WithChildren) {
  const animation = useAnimation();
  const pageLock = useLock();

  // window.onmousemove = useThrottle(animation.footprintsEffect);
  // window.onmouseup = animation.rippleEffect;
  // window.onmousedown = animation.rippleReverseEffect;

  window.onkeydown = (e) => {
    if (!e.altKey) return;

    switch (e.code) {
      case 'KeyA':
      case 'KeyD':
      case 'KeyW':
      case 'KeyS': {
        if (pageLock.locked) return;
        pageLock.lock();

        const pageStyles = {
          KeyA: {
            backgroundColor: 'orange',
            animation: 'left-in 0.5s linear',
          },
          KeyD: {
            backgroundColor: 'yellow',
            animation: 'right-in 0.5s linear',
          },
          KeyW: {
            backgroundColor: 'skyblue',
            animation: 'up-in 0.5s linear',
          },
          KeyS: {
            backgroundColor: 'blue',
            animation: 'down-in 0.5s linear',
          },
        };

        const pageStyle = pageStyles[e.code];

        const transitionPage = document.createElement('div');
        transitionPage.className = 'transition-page';
        transitionPage.style.backgroundColor = pageStyle.backgroundColor;
        transitionPage.style.animation = pageStyle.animation;
        document.body.append(transitionPage);

        setTimeout(() => {
          document.body.style.backgroundColor = pageStyle.backgroundColor;
          transitionPage.remove();
          pageLock.unlock();
        }, 500);
        break;
      }
    }
  };

  return <>{children}</>;
}
