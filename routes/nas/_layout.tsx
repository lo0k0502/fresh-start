import { PageProps } from '$fresh/server.ts';
import Header from '@islands/nas/Header.tsx';

export default function NASLayout({ Component }: PageProps) {
  return (
    <div class='relative w-full h-full bg-gradient-to-br from-blue-950 via-sky-800 to-blue-950 overflow-hidden'>
      <Header />
      <div class='w-full h-full pt-28 px-8 pb-8 text-white'>
        <Component />
      </div>
    </div>
  );
}
