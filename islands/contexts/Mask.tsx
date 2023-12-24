// deno-lint-ignore-file no-explicit-any
import { useSignal } from '@preact/signals';
import { createContext, type JSX } from 'preact';
import { useContext, useRef } from 'preact/hooks';
import type { WithChildren } from '@type/common.ts';

interface MaskContext {
  isOpen: boolean;
  open: (options?: { child?: JSX.Element; onClose?: <T>(...args: T[]) => void }) => void;
  close: () => void;
}

const defaultContext = {
  isOpen: false,
  open: () => {},
  close: () => {},
};

const MaskContext = createContext<MaskContext>(defaultContext);

export const useMask = () => useContext(MaskContext);

export default function MaskProvider({ children }: WithChildren) {
  const mask = useSignal(defaultContext.isOpen);
  const onCloseRef = useRef<((...args: any[]) => void) | null>(null);
  const maskChild = useRef<JSX.Element | null>(null);

  const open: MaskContext['open'] = (options) => {
    if (options?.onClose) onCloseRef.current = options.onClose;
    if (options?.child) maskChild.current = options.child;

    mask.value = true;
  };

  const close = () => {
    onCloseRef.current?.();
    maskChild.current && (maskChild.current = null);
    mask.value = false;
  };

  return (
    <MaskContext.Provider value={{ isOpen: mask.value, open, close }}>
      <div
        class={`absolute w-screen h-screen bg-opacity-50 bg-black z-20 flex justify-center items-start py-10 ${mask.value ? 'block' : 'hidden'}`}
        onClick={close}
      >
        {maskChild.current}
      </div>
      {children}
    </MaskContext.Provider>
  );
}
