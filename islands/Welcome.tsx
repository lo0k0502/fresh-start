import IconBrandDeno from 'https://deno.land/x/tabler_icons_tsx@0.0.5/tsx/brand-deno.tsx';
import { effect, useSignal } from '@preact/signals';
import { useEffect, useRef } from 'preact/hooks';
import type { WithStars } from '../types/stars.ts';
import { StarrySky } from '../base/stars.ts';
import { Firework, Particle } from '../base/firework.ts';

export default function Welcome({ stars }: WithStars) {
  const welcome = useSignal(false);
  const starsCanvas = useRef<HTMLCanvasElement>(null);
  const fireWorkCanvas = useRef<HTMLCanvasElement>(null);
  const fireworkAnimation = useRef<number>();

  const stopFirework = () => {
    if (!fireworkAnimation.current || !fireWorkCanvas.current) return;

    cancelAnimationFrame(fireworkAnimation.current);
    fireWorkCanvas.current.getContext('2d')!.clearRect(0, 0, fireWorkCanvas.current.width, fireWorkCanvas.current.height);
  };

  const startFirework = () => {
    if (!fireWorkCanvas.current) return;

    stopFirework();

    const ctx = fireWorkCanvas.current.getContext('2d')!;
    fireWorkCanvas.current.width = window.innerWidth;
    fireWorkCanvas.current.height = window.innerHeight;

    const fireworks = [new Firework(fireWorkCanvas.current, ctx)];
    const particles: Particle[] = [];

    const animate = () => {
      if (!fireWorkCanvas.current) return;

      ctx.clearRect(0, 0, fireWorkCanvas.current.width, fireWorkCanvas.current.height);

      if (Math.random() < 0.05) fireworks.push(new Firework(fireWorkCanvas.current, ctx));

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

      fireworkAnimation.current = requestAnimationFrame(animate);
    };

    fireworkAnimation.current = requestAnimationFrame(animate);
  };

  effect(() => !welcome.value && stopFirework());

  globalThis.addEventListener('resize', () => {
    if (starsCanvas.current) {
      starsCanvas.current.width = window.innerWidth;
      starsCanvas.current.height = window.innerHeight;
    }

    if (fireWorkCanvas.current) {
      fireWorkCanvas.current.width = window.innerWidth;
      fireWorkCanvas.current.height = window.innerHeight;
    }
  });

  useEffect(() => {
    if (!starsCanvas.current) return;

    new StarrySky(stars, starsCanvas.current, starsCanvas.current.getContext('2d')!).render();
  }, []);

  return (
    <>
      <canvas ref={starsCanvas} class='absolute'></canvas>
      <canvas ref={fireWorkCanvas} class='absolute'></canvas>
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
          onClick={startFirework}
          class='absolute left-1/2 bottom-0 -translate-x-1/2 w-40 h-16 bg-white text-slate-700 rounded-lg flex justify-center items-center text-3xl font-semibold hover:bg-slate-100 active:bg-slate-200 select-none'
        >
          Welcome!
        </div>
      </div>
    </>
  );
}
