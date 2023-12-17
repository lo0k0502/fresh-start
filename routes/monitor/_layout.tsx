import { PageProps } from '$fresh/server.ts';

export default function MonitorLayout({ Component }: PageProps) {
  return (
    <div class='w-full h-full bg-emerald-500'>
      <Component />
    </div>
  );
}
