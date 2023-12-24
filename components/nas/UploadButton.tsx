import { useCallback } from 'preact/hooks';
import { useMask } from '../../islands/contexts/Mask.tsx';
import { UploadDialog } from './UploadDialog.tsx';

interface UploadButtonProps {
  loadFiles: () => Promise<void>;
}

export const UploadButton = ({ loadFiles }: UploadButtonProps) => {
  const { open } = useMask();

  const onClick = useCallback(() => open({ child: <UploadDialog loadFiles={loadFiles} /> }), []);

  return (
    <div onClick={onClick} class='rounded h-8 w-28 bg-white flex gap-2 justify-center items-center text-slate-500 cursor-pointer select-none hover:bg-slate-100 active:bg-slate-300'>
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
        class='h-4 w-4'
      >
        <path d='M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4'></path>
        <polyline points='17 8 12 3 7 8'></polyline>
        <line x1='12' x2='12' y1='3' y2='15'></line>
      </svg>
      <span>Upload</span>
    </div>
  );
};
