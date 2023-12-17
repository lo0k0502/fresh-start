export type KeyboardEventRule = Pick<KeyboardEvent, 'code' | 'altKey' | 'ctrlKey' | 'shiftKey' | 'metaKey'>;
export type PartialKeyboardEventRule = Partial<KeyboardEventRule> & { code: KeyboardEventRule['code'] };
