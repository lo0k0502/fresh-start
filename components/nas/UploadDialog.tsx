import { computed, useSignal } from '@preact/signals';
import { useCallback, useRef } from 'preact/hooks';
import { uploadFile } from '../../base/api.ts';
import { mimetypes } from '../../constants/common.ts';
import { useMask } from '../../islands/contexts/Mask.tsx';
import { formatBytes } from '../../utils/common.ts';
import { Button } from '../Button.tsx';
import { Chevron } from '../Chevron.tsx';

interface UploadDialogProps {
  loadFiles: () => Promise<void>;
}

export const UploadDialog = ({ loadFiles }: UploadDialogProps) => {
  const { close } = useMask();
  const dragHover = useSignal(false);
  const file = useSignal<File | null>(null);
  const fileURI = useSignal<string>('');
  const isUploading = useSignal(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const setFile = (fileValue: File | null) => {
    file.value = fileValue;
    fileURI.value = fileValue?.name || '';
  };

  const handleDrag = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    dragHover.value = e.type === 'dragenter' || e.type === 'dragover';
  };

  const onDrop = (e: DragEvent) => {
    e.preventDefault();

    if (e.dataTransfer?.files[0]) setFile(e.dataTransfer.files[0]);
  };

  const isTypeValid = computed(() => !!file.value && Object.values(mimetypes).reduce((prev, current) => prev || current.includes(file.value!.type), false));
  const preview = computed(() => {
    if (!file.value) return null;

    const url = URL.createObjectURL(file.value);

    switch (true) {
      case mimetypes.pdf.includes(file.value.type):
        return <embed src={url} class='w-full h-96' />;

      case mimetypes.font.includes(file.value.type):
        return <div>font</div>;

      case mimetypes.image.includes(file.value.type):
        return <img src={url} class='max-w-lg max-h-80' />;

      case mimetypes.video.includes(file.value.type):
        return (
          <video class='max-w-lg max-h-80' controls>
            <source src={url}>
              Your browser does not support HTML5 video.
            </source>
          </video>
        );

      case mimetypes.text.includes(file.value.type):
        return <div>text</div>;

      default:
        return <div>Unsupported File</div>;
    }
  });

  const upload = useCallback(async () => {
    if (!file.value) return;

    try {
      isUploading.value = true;

      const formData = new FormData();
      formData.append(fileURI.value, file.value);

      await uploadFile(formData);
      await loadFiles();

      isUploading.value = false;
      close();
    } catch (error) {
      console.log('Error Uploading File: ', error);
    }
  }, []);

  return (
    <div
      style={{ width: '40rem' }}
      class='relative p-2 bg-white rounded-2xl max-h-full text-slate-600 overflow-auto no-scrollbar'
      onClick={(e) => e.stopPropagation()}
      onDragEnter={handleDrag}
      onDragOver={handleDrag}
      onDragLeave={handleDrag}
    >
      {file.value
        ? (
          <div class='p-4 flex flex-col gap-4'>
            <Button
              label='Cancel'
              left={<Chevron direction='left' />}
              class='w-full border-1 bg-white border-slate-600'
              onClick={() => file.value = null}
            />
            <div class='text-lg text-black font-semibold flex gap-4'>
              <span>Name:</span>
              <span class='font-medium'>{file.value.name}</span>
            </div>
            <div class='text-lg text-black font-semibold flex gap-4'>
              <span>URI:</span>
              <input type='text' class='font-medium flex-grow rounded-sm outline-none outline-1 focus-visible:outline-2 outline-slate-600' defaultValue={fileURI.value} onChange={(e) => fileURI.value = e.currentTarget.value} />
            </div>
            <div class='text-lg text-black font-semibold flex gap-4'>
              <span>Mime Type:</span>
              <span class={`font-medium ${!isTypeValid ? 'text-yellow-500' : ''}`}>{isTypeValid.value ? file.value.type : 'Unsupported Type ⚠️'}</span>
            </div>
            <div class='text-lg text-black font-semibold flex gap-4'>
              <span>Size:</span>
              <span class='font-medium'>{formatBytes(file.value.size)}</span>
            </div>
            <div class='flex justify-center'>
              {preview.value}
            </div>
            <Button
              label='Upload'
              dark
              class='w-full bg-slate-600 text-white'
              onClick={upload}
            />
          </div>
        )
        : (
          <>
            <input ref={inputRef} type='file' class='hidden' onChange={(e) => setFile(e.currentTarget.files?.[0] || null)} />
            <div
              class={`w-full h-96 rounded-2xl flex flex-col gap-2 justify-center items-center transition-colors bg-white ${dragHover.value ? 'brightness-95 border-2 border-dashed border-gray-400' : ''}`}
              onDrop={onDrop}
            >
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
                class='h-12 w-12'
              >
                <path d='M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4'></path>
                <polyline points='17 8 12 3 7 8'></polyline>
                <line x1='12' x2='12' y1='3' y2='15'></line>
              </svg>
              <span class='text-lg font-semibold'>
                Drag the file and drop it here to upload
              </span>
              <span class='text-md text-center'>
                Or click the button below to browse your files
              </span>
              <Button
                label='Browse Files'
                class='border-1 border-slate-600 bg-white'
                disabled={isUploading}
                onClick={() => inputRef.current?.click()}
              />
            </div>
          </>
        )}
    </div>
  );
};
