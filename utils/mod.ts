// deno-lint-ignore-file no-explicit-any
import { signal } from '@preact/signals';

export const toThrottle = <T extends any[]>(
  callback: (...args: T) => void,
  options = { timeout: 50 },
) => {
  const lock = signal(false);

  return (...args: T) => {
    if (lock.value) return;
    lock.value = true;
    setTimeout(() => lock.value = false, options.timeout);

    callback(...args);
  };
};

export const toDebounce = <T extends any[]>(
  callback: (...args: T) => void,
  options = { timeout: 50 },
) => {
  const timer = signal<number | undefined>(undefined);

  return (...args: T) => {
    clearTimeout(timer.value);
    timer.value = setTimeout(() => callback(...args), options.timeout);
  };
};
