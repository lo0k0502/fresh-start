// deno-lint-ignore-file no-explicit-any
import { useRef } from 'preact/hooks';

export const useThrottle = <T extends any[]>(
  callback: (...args: T) => void,
  options = { timeout: 50 },
) => {
  const lock = useRef(false);

  return (...args: T) => {
    if (lock.current) return;
    lock.current = true;
    setTimeout(() => lock.current = false, options.timeout);

    callback(...args);
  };
};
