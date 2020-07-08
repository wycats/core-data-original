declare const TRACKED_CACHE: unique symbol;

interface TrackedCache<T> {
  [TRACKED_CACHE]: T;
}

export function createCache<T>(callback: () => T): TrackedCache<T>;
export function getValue<T>(cache: TrackedCache<T>): T;
export function isConst(cache: TrackedCache<unknown>): boolean;
