import { PageProps } from '$fresh/server.ts';
import ContextProvider from '../islands/contexts/ContextProvider.tsx';

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
        <ContextProvider>
          <Component />
        </ContextProvider>
      </body>
    </html>
  );
}
