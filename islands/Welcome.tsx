import IconBrandDeno from 'https://deno.land/x/tabler_icons_tsx@0.0.5/tsx/brand-deno.tsx';
import { effect, useSignal } from '@preact/signals';
import { useRef } from 'preact/hooks';
import { Firework, Particle } from '../base/firework.ts';
import { starMetadata } from '../constants/animation.ts';

const stars = starMetadata.map(({ top, left, size, animationTime, animationDelay }) => (
  <span
    style={{
      position: 'absolute',
      top: `${top}dvh`,
      left: `${left}dvw`,
      width: `${size}vmin`,
      height: `${size}vmin`,
      borderRadius: '50%',
      backgroundColor: 'white',
      animation: `star-blink ${animationTime}s ease-in-out infinite`,
      animationDelay: `${animationDelay}s`,
    }}
  />
));

export default function Welcome() {
  const welcome = useSignal(false);
  const canvas = useRef<HTMLCanvasElement>(null);
  const animation = useRef<number>();

  const stopAnimation = () => {
    if (!animation.current || !canvas.current) return;

    cancelAnimationFrame(animation.current);
    canvas.current.getContext('2d')!.clearRect(0, 0, canvas.current.width, canvas.current.height);
  };

  const startAnimation = () => {
    if (!canvas.current) return;

    stopAnimation();

    const ctx = canvas.current.getContext('2d')!;
    canvas.current.width = window.innerWidth;
    canvas.current.height = window.innerHeight;

    const fireworks = [new Firework(canvas.current, ctx)];
    const particles: Particle[] = [];

    const animate = () => {
      if (!canvas.current) return;

      ctx.clearRect(0, 0, canvas.current.width, canvas.current.height);

      if (Math.random() < 0.05) fireworks.push(new Firework(canvas.current, ctx));

      for (let i = fireworks.length - 1; i >= 0; i--) {
        fireworks[i].update();

        if (!fireworks[i].shouldExplode) continue;

        for (let j = 0; j < 50; j++) {
          particles.push(new Particle(ctx, fireworks[i].drawInfo));
        }

        fireworks.splice(i, 1);
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();

        if (particles[i].life > 0) continue;

        particles.splice(i, 1);
      }

      animation.current = requestAnimationFrame(animate);
    };

    animation.current = requestAnimationFrame(animate);
  };

  effect(() => !welcome.value && stopAnimation());

  return (
    <>
      <div class='absolute w-screen h-screen'>
        {stars}
      </div>
      <canvas ref={canvas} class='absolute'></canvas>
      <div
        onMouseEnter={() => welcome.value = true}
        onMouseLeave={() => welcome.value = false}
        style={{
          height: welcome.value ? '22rem' : '15rem',
          borderRadius: '9999px',
          borderBottomLeftRadius: welcome.value ? '0px' : '9999px',
          borderBottomRightRadius: welcome.value ? '0px' : '9999px',
          transition: 'height 1s ease-in-out, border-bottom-left-radius 1s ease-in-out, border-bottom-right-radius 1s ease-in-out',
        }}
        class='relative'
      >
        <IconBrandDeno class='w-60 h-60' />
        <div
          style={{
            opacity: welcome.value ? 1 : 0,
            transition: `opacity 0.5s ${welcome.value ? '0.3s' : ''} linear`,
            cursor: welcome.value ? 'pointer' : 'none',
          }}
          onClick={startAnimation}
          class='absolute left-1/2 bottom-0 -translate-x-1/2 w-40 h-16 bg-white text-slate-700 rounded-lg flex justify-center items-center text-3xl font-semibold hover:bg-slate-100 active:bg-slate-200 select-none'
        >
          Welcome!
        </div>
      </div>
    </>
  );
}
