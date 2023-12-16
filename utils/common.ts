export const wait = (timeout: number) => new Promise<void>((resolve) => setTimeout(() => resolve(), timeout));

export const isLiteral = <T extends string>(target: string, literalArray: ReadonlyArray<T>): target is T => literalArray.includes(target as T);
