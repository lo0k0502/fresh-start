// deno-lint-ignore-file no-explicit-any
import { signal } from '@preact/signals';

export const useThrottle = <T extends any[], S>(
  callback: (...args: T) => S,
) => {
  const lock = signal(false);

  return (...args: T) => {
    if (lock.value) return;
    lock.value = true;
    setTimeout(() => {
      lock.value = false;
    }, 50);

    callback(...args);
  };
};
