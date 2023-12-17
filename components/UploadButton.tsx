import { useRouter } from '../islands/contexts/Router.tsx';

export default function UploadButton() {
  const { navigate } = useRouter();

  return (
    <div onClick={() => navigate('/nas/upload')} class='rounded h-8 w-28 bg-white flex justify-center items-center text-slate-500 cursor-pointer select-none hover:bg-slate-100 active:bg-slate-300'>
      <span>Upload</span>
    </div>
  );
}
