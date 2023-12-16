import { PageProps } from '$fresh/server.ts';
import AnimationProvider from '../islands/AnimationProvider.tsx';
import Router from '../islands/contexts/Router.tsx';
import MaskProvider from '../islands/contexts/Mask.tsx';

export default function App({ Component }: PageProps) {
  return (
    <html>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <title>fresh-start</title>
        <link rel='stylesheet' href='/styles.css' />
        <link rel='stylesheet' href='/main.css' />
      </head>
      <body>
        <Router>
          <AnimationProvider>
            <MaskProvider>
              <Component />
            </MaskProvider>
          </AnimationProvider>
        </Router>
      </body>
    </html>
  );
}
