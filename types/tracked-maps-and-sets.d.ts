export class TrackedArray<T> extends Array<T> {}
export class TrackedMap<T, U> extends Map<T, U> {}
export class TrackedSet<T> extends Set<T> {}
export class TrackedWeakMap<T extends object, U> extends WeakMap<T, U> {}
export class TrackedWeakSet<T extends object> extends WeakSet<T> {}
