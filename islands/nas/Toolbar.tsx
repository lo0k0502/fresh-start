import UploadButton from '../../components/nas/UploadButton.tsx';

interface ToolbarProps {
  loadFiles: () => Promise<void>;
}

export default function Toolbar({ loadFiles }: ToolbarProps) {
  return (
    <div class='flex'>
      <UploadButton loadFiles={loadFiles} />
    </div>
  );
}
