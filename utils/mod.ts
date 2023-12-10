// deno-lint-ignore-file no-explicit-any
import { signal, useSignal } from '@preact/signals';
import { type Lock } from '../types/common.ts';

export const useThrottle = <T extends any[], S>(
  callback: (...args: T) => S,
  options = { timeout: 50 },
) => {
  const lock = signal(false);

  return (...args: T) => {
    if (lock.value) return;
    lock.value = true;
    setTimeout(() => {
      lock.value = false;
    }, options.timeout);

    callback(...args);
  };
};

export const useLock = (): Lock => {
  const lock = useSignal(false);

  return {
    locked: lock.value,
    lock: () => {
      lock.value = true;
    },
    unlock: () => {
      lock.value = false;
    },
  };
};
