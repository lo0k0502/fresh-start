import IconTrash from 'https://deno.land/x/tabler_icons_tsx@0.0.5/tsx/trash.tsx';
import type { FileInfo } from '@type/nas.ts';
import { VideoPreview } from '@components/common/VideoPreview.tsx';
import { mimetypes } from '@constants/common.ts';
import { useRouter } from '@islands/contexts/Router.tsx';
import { formatBytes } from '@utils/common.ts';

interface FileCardProps {
  file: FileInfo;
  onDeleteClick: (url: string) => void;
}

export const FileCard = ({ file: { name, uri, url, type, size, uploadedAt }, onDeleteClick }: FileCardProps) => {
  const { navigate } = useRouter();

  const preview = (() => {
    switch (true) {
      case mimetypes.pdf.includes(type):
        return <img src='/mit/pdf.svg' class='h-20' />;

      case mimetypes.font.includes(type):
        return <img src='/mit/font.svg' class='h-20' />;

      case mimetypes.image.includes(type):
        return (
          <object data={url} class='h-20'>
            <img src='/mit/image.svg' class='h-20' />
          </object>
        );

      case mimetypes.video.includes(type):
        return <VideoPreview url={url} />;

      case mimetypes.text.includes(type):
        return <img src='/mit/document.svg' class='h-20' />;

      default:
        return <div>Unsupported File</div>;
    }
  })();

  return (
    <div class='bg-white grid grid-rows-3 rounded-lg h-44 overflow-hidden'>
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
      <div
        class='row-span-2 grid grid-cols-8 text-black bg-white hover:brightness-95 active:brightness-90 cursor-pointer'
        onClick={() => navigate(`/nas/${uri}`)}
      >
        <div class='col-span-1 justify-center'>
          {preview}
        </div>
        <div class='col-span-2 select-none overflow-x-auto whitespace-nowrap no-scrollbar'>
          {name}
        </div>
        <div class='col-span-2 select-none overflow-x-auto whitespace-nowrap no-scrollbar'>
          {uri}
        </div>
        <div class='col-span-1 select-none'>{formatBytes(size)}</div>
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
};
