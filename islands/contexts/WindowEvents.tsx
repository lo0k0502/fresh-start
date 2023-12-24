import { createContext } from 'preact';
import { useContext, useRef } from 'preact/hooks';
import type { WithChildren } from '@type/common.ts';
import type { KeyboardEventRule, PartialKeyboardEventRule } from '@type/windowEvents.ts';

interface WindowEventsContext {
  setKeyEvent: (keyboardEventRule: PartialKeyboardEventRule, eventFunction: (e: KeyboardEvent) => void) => void;
}

const WindowEventsContext = createContext<WindowEventsContext>({
  setKeyEvent: () => {},
});

export const useWindowEvents = () => useContext(WindowEventsContext);

export default function WindowEventsProvider({ children }: WithChildren) {
  const keyEvents = useRef(new Map<string, (e: KeyboardEvent) => void>());

  const setKeyEvent = ({ code, altKey = false, ctrlKey = false, metaKey = false, shiftKey = false }: PartialKeyboardEventRule, eventFunction: (e: KeyboardEvent) => void) => {
    const stringifiedRule = JSON.stringify({ code, altKey, ctrlKey, metaKey, shiftKey });

    if (keyEvents.current.has(stringifiedRule)) throw new Error('This key is occupied!');
    keyEvents.current.set(stringifiedRule, eventFunction);
  };

  const getKeyEvent = ({ code, altKey, ctrlKey, metaKey, shiftKey }: KeyboardEventRule) => {
    const stringifiedRule = JSON.stringify({ code, altKey, ctrlKey, metaKey, shiftKey });

    if (!keyEvents.current.has(stringifiedRule)) return null;
    return keyEvents.current.get(stringifiedRule)!;
  };

  window.onkeyup = function (e) {
    getKeyEvent(e)?.(e);
  };

  return (
    <WindowEventsContext.Provider value={{ setKeyEvent }}>
      {children}
    </WindowEventsContext.Provider>
  );
}
