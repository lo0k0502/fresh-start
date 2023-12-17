import UploadButton from '../../components/UploadButton.tsx';

export default function NAS() {
  return (
    <div class='w-full h-full'>
      <div class='w-full flex justify-between items-center'>
        <span class='text-4xl font-semibold select-none'>
          Files
        </span>
        <UploadButton />
      </div>
      <div class='bg-white rounded-lg h-40 mt-4'>
        <div
          style={{ borderBottomWidth: '1px' }}
          class='h-4 border-gray-500'
        >
        </div>
      </div>
    </div>
  );
}
