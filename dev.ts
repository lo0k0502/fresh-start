#!/usr/bin/env -S deno run -A --env --watch=static/,routes/

import dev from '$fresh/dev.ts';
import config from './fresh.config.ts';

await dev(import.meta.url, './main.ts', config);
