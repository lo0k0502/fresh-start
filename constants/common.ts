import { Direction } from '../types/route.ts';

export const isMac = navigator.userAgent.includes('Mac OS X');

export const directions: Direction[] = ['left', 'right', 'up', 'down'];
