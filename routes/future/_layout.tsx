import { PageProps } from '$fresh/server.ts';

export default function FutureLayout({ Component }: PageProps) {
  return (
    <div class='w-full h-full bg-amber-500'>
      <Component />
    </div>
  );
}
