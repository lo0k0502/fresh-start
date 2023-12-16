import { signal } from '@preact/signals';

export const menu = signal<'open' | 'close'>('close');
