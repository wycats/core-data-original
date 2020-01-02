export interface AsDict<T> {
    [key: string]: T[keyof T];
}
export declare function asDict<T>(input: T): AsDict<T>;
export declare function expect<T>(val: T | null | undefined, msg?: string): asserts val;
export declare function assert(cond: any, msg?: string): asserts cond;
export declare function unreachable(_never: never, msg?: string): void;
