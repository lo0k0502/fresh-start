import IconTrash from 'https://deno.land/x/tabler_icons_tsx@0.0.5/tsx/trash.tsx';
import type { FileInfo } from '../../types/nas.ts';

interface FileCardProps {
  file: FileInfo;
  onDeleteClick: (url: string) => void;
}

export default function FileCard({ file: { name, uri, url, type, size, uploadedAt }, onDeleteClick }: FileCardProps) {
  return (
    <div class='bg-white grid grid-rows-3 rounded-lg h-44'>
      <div
        style={{ borderBottomWidth: '1px' }}
        class='row-span-1 grid grid-cols-8 border-gray-300 text-slate-500 font-semibold'
      >
        <div class='col-span-1  select-none'>Preview</div>
        <div class='col-span-2  select-none'>Name</div>
        <div class='col-span-2  select-none'>URI</div>
        <div class='col-span-1  select-none'>Size</div>
        <div class='col-span-1  select-none'>Uploaded</div>
        <div class='col-span-1  select-none'>Action</div>
      </div>
      <div class='row-span-2 grid grid-cols-8 text-black'>
        <div class='col-span-1 justify-center'>
          {type.startsWith('image') ? <img class='h-20' src={url} /> : <div class='w-28 h-20 bg-gray-200 rounded' />}
        </div>
        <div class='col-span-2 select-none overflow-x-auto whitespace-nowrap no-scrollbar'>
          {name}
        </div>
        <div class='col-span-2 select-none overflow-x-auto whitespace-nowrap no-scrollbar'>
          {uri}
        </div>
        <div class='col-span-1 select-none'>{size}</div>
        <div class='col-span-1 select-none'>{uploadedAt.toLocaleDateString()}</div>
        <div class='col-span-1'>
          <div
            class='w-12 h-12 border-1 border-gray-300 rounded flex items-center justify-center cursor-pointer hover:bg-slate-50 active:bg-slate-100'
            onClick={() => onDeleteClick(url)}
          >
            <IconTrash />
          </div>
        </div>
      </div>
    </div>
  );
}
