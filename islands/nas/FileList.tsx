import FileCard from '../../components/nas/FileCard.tsx';

export default function FileList() {
  return <div class='flex flex-col gap-4'>{new Array(10).fill(null).map(() => <FileCard />)}</div>;
}
