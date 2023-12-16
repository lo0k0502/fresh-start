// deno-lint-ignore-file no-explicit-any
import { useRef } from 'preact/hooks';

export const useThrottle = <T extends any[], S>(callback: (...args: T) => S, timeout = 50) => {
  const lock = useRef(false);

  return (...args: T) => {
    if (lock.current) return;
    lock.current = true;
    setTimeout(() => lock.current = false, timeout);

    return callback(...args);
  };
};

export const useAsyncThrottle = <T extends any[], S>(callback: (...args: T) => Promise<S>) => {
  const lock = useRef(false);

  return async (...args: T) => {
    if (lock.current) return;
    lock.current = true;

    const result = await callback(...args);

    lock.current = false;
    return result;
  };
};
