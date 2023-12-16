import NASMenu from '../../islands/NASMenu.tsx';
import NASMenuIcon from '../../islands/NASMenuIcon.tsx';

export default function NAS() {
  return (
    <div class='w-screen h-screen bg-gradient-to-br from-blue-950 via-sky-800 to-blue-950'>
      <NASMenu />
      <div
        style={{ borderBottomWidth: '1px' }}
        class='w-full h-20 border-white absolute px-4 py-2 gap-2 flex items-center text-white'
      >
        <NASMenuIcon />
        <span class='font-semibold text-2xl pointer-events-none select-none'>
          NAS System
        </span>
        <div class='relative md:w-40 lg:w-80 pl-4'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            stroke='gainsboro'
            stroke-width='2'
            stroke-linecap='round'
            stroke-linejoin='round'
            class='absolute left-6 top-1.5 h-6 w-6'
          >
            <circle cx='11' cy='11' r='7'></circle>
            <path d='m26.7 26.7-10-10'></path>
          </svg>
          <input
            class='flex h-10 text-slate-500 rounded-md border border-input px-3 py-2 text-md ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-full bg-white shadow-none appearance-none pl-9'
            placeholder='Search files...'
            type='search'
          />
        </div>
        <div class='flex-grow' />
        <div class='justify-self-end w-8 h-8 rounded-full bg-white cursor-pointer' />
      </div>
      <div class='w-full h-full pt-28 px-8 text-white'>
        <div class='w-full flex justify-between items-center'>
          <span class='text-4xl font-semibold select-none'>Files</span>
          <div class='rounded h-8 w-28 bg-white flex justify-center items-center text-slate-500 cursor-pointer select-none hover:bg-slate-100 active:bg-slate-300'>
            <span>Upload</span>
          </div>
        </div>
      </div>
    </div>
  );
}
