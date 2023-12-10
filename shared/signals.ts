import { signal } from '@preact/signals';

export const mask = signal<'block' | 'hidden'>('hidden');

export const menu = signal(false);
