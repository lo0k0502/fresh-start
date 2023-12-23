import FileList from '../../islands/nas/FileList.tsx';
import Toolbar from '../../islands/nas/Toolbar.tsx';

export default async function NAS() {
  const files = await (await fetch('http://localhost:8080/resources/hpc')).json();

  return (
    <div class='relative flex flex-col w-full h-full'>
      <div class='flex justify-between items-center'>
        <span class='text-4xl font-semibold select-none'>
          Files
        </span>
        <Toolbar />
      </div>
      <div class='flex-grow mt-8 overflow-auto no-scrollbar'>
        <FileList files={files} />
      </div>
    </div>
  );
}
