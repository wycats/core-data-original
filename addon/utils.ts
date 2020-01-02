export interface AsDict<T> {
  [key: string]: T[keyof T];
}

export function asDict<T>(input: T): AsDict<T> {
  return input as any;
}

export function expect<T>(
  val: T | null | undefined,
  msg?: string
): asserts val {
  if (val === null || val === undefined) {
    throw new Error(msg || `Assertion failure`);
  }
}

export function assert(cond: any, msg?: string): asserts cond {
  if (!cond) {
    throw new Error(msg || `Assertion error`);
  }
}

export function unreachable(_never: never, msg?: string) {
  throw new Error(msg || `Unreachable code`);
}
