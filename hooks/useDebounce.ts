// deno-lint-ignore-file no-explicit-any
import { useRef } from 'preact/hooks';

export const useDebounce = <T extends any[]>(
  callback: (...args: T) => void,
  options = { timeout: 50 },
) => {
  const timer = useRef<number | undefined>(undefined);

  return (...args: T) => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => callback(...args), options.timeout);
  };
};
