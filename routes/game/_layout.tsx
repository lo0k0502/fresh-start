import { PageProps } from '$fresh/server.ts';

export default function GameLayout({ Component }: PageProps) {
  return (
    <div class='w-full h-full bg-indigo-500'>
      <Component />
    </div>
  );
}
