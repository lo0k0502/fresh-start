// DO NOT EDIT. This file is generated by Fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import * as $_404 from './routes/_404.tsx';
import * as $_app from './routes/_app.tsx';
import * as $future_layout from './routes/future/_layout.tsx';
import * as $future_index from './routes/future/index.tsx';
import * as $game_layout from './routes/game/_layout.tsx';
import * as $game_index from './routes/game/index.tsx';
import * as $index from './routes/index.tsx';
import * as $monitor_layout from './routes/monitor/_layout.tsx';
import * as $monitor_index from './routes/monitor/index.tsx';
import * as $nas_fileURI_ from './routes/nas/[...fileURI].tsx';
import * as $nas_layout from './routes/nas/_layout.tsx';
import * as $nas_index from './routes/nas/index.tsx';
import * as $stream_layout from './routes/stream/_layout.tsx';
import * as $stream_index from './routes/stream/index.tsx';
import * as $Welcome from './islands/Welcome.tsx';
import * as $contexts_AnimationProvider from './islands/contexts/AnimationProvider.tsx';
import * as $contexts_ContextProvider from './islands/contexts/ContextProvider.tsx';
import * as $contexts_Mask from './islands/contexts/Mask.tsx';
import * as $contexts_Router from './islands/contexts/Router.tsx';
import * as $contexts_WindowEvents from './islands/contexts/WindowEvents.tsx';
import * as $nas_FileList from './islands/nas/FileList.tsx';
import * as $nas_Header from './islands/nas/Header.tsx';
import { type Manifest } from '$fresh/server.ts';

const manifest = {
  routes: {
    './routes/_404.tsx': $_404,
    './routes/_app.tsx': $_app,
    './routes/future/_layout.tsx': $future_layout,
    './routes/future/index.tsx': $future_index,
    './routes/game/_layout.tsx': $game_layout,
    './routes/game/index.tsx': $game_index,
    './routes/index.tsx': $index,
    './routes/monitor/_layout.tsx': $monitor_layout,
    './routes/monitor/index.tsx': $monitor_index,
    './routes/nas/[...fileURI].tsx': $nas_fileURI_,
    './routes/nas/_layout.tsx': $nas_layout,
    './routes/nas/index.tsx': $nas_index,
    './routes/stream/_layout.tsx': $stream_layout,
    './routes/stream/index.tsx': $stream_index,
  },
  islands: {
    './islands/Welcome.tsx': $Welcome,
    './islands/contexts/AnimationProvider.tsx': $contexts_AnimationProvider,
    './islands/contexts/ContextProvider.tsx': $contexts_ContextProvider,
    './islands/contexts/Mask.tsx': $contexts_Mask,
    './islands/contexts/Router.tsx': $contexts_Router,
    './islands/contexts/WindowEvents.tsx': $contexts_WindowEvents,
    './islands/nas/FileList.tsx': $nas_FileList,
    './islands/nas/Header.tsx': $nas_Header,
  },
  baseUrl: import.meta.url,
} satisfies Manifest;

export default manifest;
