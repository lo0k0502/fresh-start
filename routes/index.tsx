import { Handlers, PageProps } from '$fresh/server.ts';
import type { WithStars } from '../types/stars.ts';
import { getStars } from '../base/stars.ts';
import Welcome from '../islands/Welcome.tsx';

export const handler: Handlers = {
  async GET(_req, ctx) {
    return ctx.render({ stars: await getStars() });
  },
};

export default function Home(props: PageProps<WithStars>) {
  return (
    <div class='bg-gradient-to-t from-gray-900 to-gray-800 w-full h-full flex justify-center items-center text-white'>
      <Welcome stars={props.data.stars} />
    </div>
  );
}
