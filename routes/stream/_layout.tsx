import { PageProps } from '$fresh/server.ts';

export default function StreamLayout({ Component }: PageProps) {
  return (
    <div class='w-full h-full bg-fuchsia-300'>
      <Component />
    </div>
  );
}
