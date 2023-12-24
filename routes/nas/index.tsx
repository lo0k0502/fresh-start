import FileList from '../../islands/nas/FileList.tsx';

export default async function NAS() {
  const files = await (await fetch('http://localhost:8080/resources/hpc')).json();

  return (
    <div class='relative flex flex-col w-full h-full'>
      <FileList files={files} />
    </div>
  );
}
