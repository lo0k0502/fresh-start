import { IS_BROWSER } from '$fresh/runtime.ts';
import { JSX } from 'preact';

interface ButtonProps extends JSX.HTMLAttributes<HTMLButtonElement> {
  label: string;
  dark?: boolean;
  left?: JSX.Element;
  right?: JSX.Element;
}

export function Button({
  label,
  dark = false,
  left,
  right,
  class: classNames,
  ...props
}: ButtonProps) {
  const hoverEffect = dark ? 'hover:brightness-105 active:brightness-110' : 'hover:brightness-95 active:brightness-90';

  return (
    <button
      {...props}
      disabled={!IS_BROWSER || props.disabled}
      class={`h-8 w-28 rounded ${hoverEffect} transition-colors flex gap-2 justify-center items-center text-slate-600 ${classNames}`}
    >
      {left}
      {label}
      {right}
    </button>
  );
}
