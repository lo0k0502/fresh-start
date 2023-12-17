import FileList from '../../islands/nas/FileList.tsx';
import Toolbar from '../../islands/nas/Toolbar.tsx';

export default function NAS() {
  return (
    <div class='relative flex flex-col w-full h-full'>
      <div class='flex justify-between items-center'>
        <span class='text-4xl font-semibold select-none'>
          Files
        </span>
        <Toolbar />
      </div>
      <div class='flex-grow mt-8 overflow-auto no-scrollbar'>
        <FileList />
      </div>
    </div>
  );
}
