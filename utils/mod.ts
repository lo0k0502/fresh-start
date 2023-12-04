// deno-lint-ignore-file no-explicit-any
import { signal } from '@preact/signals';

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

export const useLock = () => {
  const lock = signal(false);

  const guard = <T extends any[], S>(callback: (...args: T) => S) => {
    return (...args: T): S | void => {
      if (lock.value) return;
      lock.value = true;

      const result = callback(...args);

      lock.value = false;

      return result;
    };
  };

  return { lock, guard };
};
