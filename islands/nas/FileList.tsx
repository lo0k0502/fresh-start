import { useSignal } from '@preact/signals';
import { useCallback } from 'preact/hooks';
import type { FileInfo } from '../../types/nas.ts';
import FileCard from '../../components/nas/FileCard.tsx';
import UploadButton from '../../components/nas/UploadButton.tsx';
import Toolbar from './Toolbar.tsx';

interface FileListProps {
  files: FileInfo[];
}

export default function FileList({ files }: FileListProps) {
  const $files = useSignal(files.map((file) => ({ ...file, uploadedAt: new Date(file.uploadedAt) })));

  const loadFiles = useCallback(async () => {
    $files.value = (await (await fetch('http://localhost:8080/resources/hpc')).json()).map((file: FileInfo) => ({ ...file, uploadedAt: new Date(file.uploadedAt) }));
  }, []);

  const deleteFile = useCallback(async (url: string) => {
    try {
      await fetch(url, { method: 'DELETE' });
      await loadFiles();
    } catch (error) {
      console.error('Error Deleting File: ', error);
    }
  }, []);

  return (
    <>
      <div class='flex justify-between items-center'>
        <span class='text-4xl font-semibold select-none'>
          Files
        </span>
        <Toolbar loadFiles={loadFiles} />
      </div>
      <div class='flex-grow mt-8 overflow-auto no-scrollbar'>
        {$files.value.length
          ? (
            <div class='flex flex-col gap-4'>
              {$files.value.map((file) => <FileCard file={file} onDeleteClick={deleteFile} />)}
            </div>
          )
          : (
            <div class='h-full flex flex-col items-center'>
              <img src='/icons8-file.svg' class='h-80' />
              <span class='text-4xl font-semibold'>No Files Found</span>
              <span class='text-xl my-4'>Click the button below to upload files</span>
              <UploadButton loadFiles={loadFiles} />
            </div>
          )}
      </div>
    </>
  );
}
