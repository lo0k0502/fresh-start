import { useSignal } from '@preact/signals';
import { useCallback } from 'preact/hooks';
import type { FileInfo } from '../../types/nas.ts';
import { deleteFile, listFiles } from '../../base/api.ts';
import { FileCard, Toolbar, UploadButton } from '../../components/nas/mod.ts';

interface FileListProps {
  files: FileInfo[];
}

const handleFiles = (files: FileInfo[]) => files.map((file) => ({ ...file, uploadedAt: new Date(file.uploadedAt) })).toSorted((a: FileInfo, b: FileInfo) => b.uploadedAt.getTime() - a.uploadedAt.getTime());

export default function FileList({ files }: FileListProps) {
  const $files = useSignal(handleFiles(files));

  const loadFiles = useCallback(async () => {
    $files.value = handleFiles(await listFiles());
  }, []);

  const removeFile = useCallback(async (url: string) => {
    try {
      await deleteFile(url);
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
              {$files.value.map((file) => <FileCard file={file} onDeleteClick={removeFile} />)}
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
