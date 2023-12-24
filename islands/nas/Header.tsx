import NASMenu from '../../components/nas/NASMenu.tsx';
import NASMenuIcon from '../../components/nas/NASMenuIcon.tsx';

export default function Header() {
  return (
    <>
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
    </>
  );
}
