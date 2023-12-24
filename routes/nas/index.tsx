import { listFiles } from '../../base/api.ts';
import FileList from '../../islands/nas/FileList.tsx';

export default async function NAS() {
  const files = await listFiles();

  return (
    <div class='relative flex flex-col w-full h-full'>
      <FileList files={files} />
    </div>
  );
}
