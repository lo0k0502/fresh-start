import { ComponentChildren } from 'preact';

export interface WithChildren {
  children: ComponentChildren;
}

export interface Lock {
  locked: boolean;
  lock: () => void;
  unlock: () => void;
}
