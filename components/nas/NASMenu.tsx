import { computed } from '@preact/signals';
import { menu } from '../../shared/signals.ts';
import { nasMenuDuration } from '../../constants/animation.ts';

export const NASMenu = () => {
  const itemClass = 'w-full h-8 top-40 bg-blue-950 rounded-e-lg text-white flex items-center pl-4 cursor-pointer hover:bg-blue-600 active:bg-blue-700 shadow menu';

  const menuClass = computed<'left-0' | '-left-40'>(() => menu.value === 'open' ? 'left-0' : '-left-40');

  return (
    <div style={{ transition: `left ${nasMenuDuration}ms linear` }} class={`absolute z-10 w-40 flex flex-col gap-2 py-2 pr-2 top-24 bg-slate-500 rounded-e-lg bg-opacity-50 ${menuClass.value}`}>
      <div class={itemClass}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          stroke-width='2'
          stroke-linecap='round'
          stroke-linejoin='round'
          class='h-4 w-4 text-gray-200'
        >
          <path d='m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z'></path>
          <polyline points='9 22 9 12 15 12 15 22'></polyline>
        </svg>
        <span class='ml-2'>
          Home
        </span>
      </div>
      <div class={itemClass}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          stroke-width='2'
          stroke-linecap='round'
          stroke-linejoin='round'
          class='h-4 w-4 text-gray-200'
        >
          <path d='M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4'></path>
          <polyline points='17 8 12 3 7 8'></polyline>
          <line x1='12' x2='12' y1='3' y2='15'></line>
        </svg>
        <span class='ml-2'>
          Upload
        </span>
      </div>
      <div class={itemClass}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          stroke-width='2'
          stroke-linecap='round'
          stroke-linejoin='round'
          class='h-4 w-4 text-gray-200'
        >
          <path d='M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z'></path>
          <circle cx='12' cy='12' r='3'></circle>
        </svg>
        <span class='ml-2'>
          View
        </span>
      </div>
      <div class={itemClass}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          stroke-width='2'
          stroke-linecap='round'
          stroke-linejoin='round'
          class='h-4 w-4 text-gray-200'
        >
          <path d='M3 6h18'></path>
          <path d='M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6'></path>
          <path d='M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2'></path>
        </svg>
        <span class='ml-2'>
          Delete
        </span>
      </div>
    </div>
  );
};
