import IconBrandDeno from 'https://deno.land/x/tabler_icons_tsx@0.0.5/tsx/brand-deno.tsx';
import { useSignal } from '@preact/signals';

export default function Welcome() {
  const welcome = useSignal(false);

  return (
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
        disabled={true}
        class='absolute left-1/2 bottom-0 -translate-x-1/2 w-40 h-16 bg-white text-slate-700 rounded-lg flex justify-center items-center text-3xl font-semibold hover:bg-slate-100 active:bg-slate-200 select-none'
      >
        Welcome!
      </div>
    </div>
  );
}
