import { computed } from '@preact/signals';
import { menu } from '../shared/signals.ts';

export default function NASMenuIcon() {
  const instanceClass = computed(() => menu.value === 'open' ? 'absolute z-30 left-5.5' : '');
  const shadowClass = computed(() => !instanceClass.value ? 'hidden' : 'block');

  const onClick = () => menu.value = menu.value === 'open' ? 'close' : 'open';

  return (
    <>
      <div class={`h-14 w-14 ${shadowClass.value}`} />
      <div
        class={`h-14 w-14 rounded-full p-1.5 cursor-pointer hover:bg-slate-500 hover:bg-opacity-50 active:bg-opacity-70 ${instanceClass.value}`}
        onClick={onClick}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 30 30'
          fill='none'
          stroke='currentColor'
          stroke-width='2'
          stroke-linecap='round'
          stroke-linejoin='round'
          class='h-11 w-11 text-white'
        >
          {menu.value === 'open'
            ? (
              <>
                <path d='M6 13h18v10a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V12Z'></path>
                <path d='m6 13 2.45-4.9h13.1L24 13'></path>
                <path d='m6 13 2.45-4.9 -4-4 -3 3.95Z'></path>
                <path d='m24 13 -2.45-4.9 4-4 3 3.95Z'></path>
              </>
            )
            : (
              <>
                <path d='M6 13h18v10a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V13Z'></path>
                <path d='m6 13 2.45-4.9A2 2 0 0 1 10.24 7h9.52a2 2 0 0 1 1.8 1.1L24 12'></path>
                <path d='M15 7v6'></path>
              </>
            )}
        </svg>
      </div>
    </>
  );
}
