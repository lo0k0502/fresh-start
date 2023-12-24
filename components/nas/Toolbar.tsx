import { UploadButton } from './UploadButton.tsx';

interface ToolbarProps {
  loadFiles: () => Promise<void>;
}

export const Toolbar = ({ loadFiles }: ToolbarProps) => {
  return (
    <div class='flex'>
      <UploadButton loadFiles={loadFiles} />
    </div>
  );
};
