import FileCard from '../../components/nas/FileCard.tsx';

export default function FileList() {
  return <div class='flex flex-col gap-4'>{Array.from({ length: 10 }, () => <FileCard />)}</div>;
}
