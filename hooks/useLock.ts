import { useSignal } from '@preact/signals';
import type { Lock } from '@type/common.ts';

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
