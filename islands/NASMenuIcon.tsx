export default function NASMenuIcon() {
  return (
    <div
      class={`h-11 w-11 rounded-full p-1.5 hover:bg-slate-500 hover:bg-opacity-50`}
      onMouseEnter={() => {}}
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        stroke-width='2'
        stroke-linecap='round'
        stroke-linejoin='round'
        class='h-8 w-8 text-white'
      >
        <path d='M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z'></path>
        <path d='m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9'>
        </path>
        <path d='M12 3v6'></path>
      </svg>
    </div>
  );
}
