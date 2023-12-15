// deno-lint-ignore-file no-explicit-any
import { createContext } from 'preact';
import { WithChildren } from '../../types/common.ts';
import { useSignal } from '@preact/signals';
import { useContext, useRef } from 'preact/hooks';

const maskDefault = {
  value: false,
  open: (_onClose?: (...args: any[]) => void) => {},
  close: () => {},
};

const MaskContext = createContext(maskDefault);
export const useMask = () => useContext(MaskContext);

export default function MaskProvider({ children }: WithChildren) {
  const mask = useSignal(maskDefault.value);
  const onCloseRef = useRef<null | ((...args: any[]) => void)>(null);

  const open = (onClose?: (...args: any[]) => void) => {
    onCloseRef.current = onClose ?? null;
    mask.value = true;
  };

  const close = () => {
    onCloseRef.current?.();
    mask.value = false;
  };

  return (
    <MaskContext.Provider value={{ value: mask.value, open, close }}>
      <div
        class={`absolute w-screen h-screen bg-opacity-50 bg-black z-10 ${mask.value ? 'block' : 'hidden'}`}
        onClick={close}
      />
      {children}
    </MaskContext.Provider>
  );
}
