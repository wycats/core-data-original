import { v4 } from "ember-uuid";
import { Store } from "./index";
import {
  SomeModelClass,
  ModelClass,
  Model,
  SomeModel,
  ModelConstructor,
  MetaForModelClass,
} from "./model";
import { tracked } from "tracked-built-ins";

export enum IdKind {
  Local = "Local",
  LazyLocal = "LazyLocal",
  LazyNotLoaded = "LazyNotLoaded",
  Loaded = "Loaded",
}

export type PresentId = IdKind.Loaded | IdKind.Local;
export type LazyId = IdKind.LazyLocal | IdKind.LazyNotLoaded;

export abstract class RowId<Class extends SomeModelClass> {
  @tracked _meta: InstanceType<Class>[META] | null;

  constructor(
    readonly definition: Class,
    meta: InstanceType<Class>[META] | null,
    readonly localId: string,
    readonly remoteId: string | null = null,
    protected store: Store
  ) {
    this._meta = meta;
  }

  abstract isLazy: boolean;

  get meta(): MetaForModelClass<Class> | null {
    return this._meta;
  }

  updateMeta(meta: MetaForModelClass<Class>): void {
    this._meta = meta;
  }
}

export class LazyRowId<Class extends SomeModelClass> extends RowId<Class> {
  static local<Class extends SomeModelClass>(
    name: Class,
    store: Store,
    meta: MetaForModelClass<Class> | null = null
  ): LazyRowId<Class> {
    return new LazyRowId(name, meta, v4(), null, store);
  }

  static remote<Class extends SomeModelClass, Meta = InstanceType<Class>[META]>(
    name: Class,
    id: string,
    store: Store,
    meta: Meta | null = null
  ): LazyRowId<Class> {
    return new LazyRowId(name, meta, v4(), id, store);
  }

  readonly isLazy = true;

  intoPresent(): PresentRowId<Class> {
    return new PresentRowId(
      this.definition,
      this._meta,
      this.localId,
      this.remoteId,
      this.store
    );
  }
}

export class PresentRowId<Class extends SomeModelClass> extends RowId<Class> {
  static local<Class extends SomeModelClass>(
    name: Class,
    store: Store,
    meta: MetaForModelClass<Class> | null = null
  ): PresentRowId<Class> {
    return new PresentRowId(name, meta, v4(), null, store);
  }

  static remote<Class extends SomeModelClass>(
    name: Class,
    id: string,
    store: Store,
    meta: MetaForModelClass<Class> | null = null
  ): RowId<Class> {
    return new PresentRowId(name, meta, v4(), id, store);
  }

  readonly isLazy = false;

  get row(): InstanceType<Class> {
    return this.store.deref(this) as InstanceType<Class>;
  }
}

export type SomeRowId = RowId<SomeModelClass>;

export const ROW_VALUE = Symbol("PHANTOM: ROW_VALUE");

export interface RowValue {
  [ROW_VALUE]: true;
}

export const ROW_VALUE_MAP = new WeakMap<object, true>();

export function markRowValue<T extends object>(value: T): T & RowValue {
  ROW_VALUE_MAP.set(value, true);
  return value as T & RowValue;
}

export function isRowValue(value: unknown): value is RowValue {
  return (
    value !== null &&
    typeof value === "object" &&
    ROW_VALUE_MAP.has(value as object)
  );
}

export type ModelData = {
  [P in string]: unknown | Model<SomeModelSchema> | Model<SomeModelSchema>[];
};

export const META = Symbol("META");
export type META = typeof META;

export type ModelSchema<D extends ModelData, Metadata> = D & {
  [META]?: Metadata;
};

export type SomeModelSchema = ModelSchema<ModelData, any>;

export type ModelId<S extends SomeModelSchema> = RowId<ModelClass<S>>;

export type ModelArgs<Schema extends SomeModelSchema> = {
  [P in keyof Schema]: Schema[P] extends ModelConstructor<infer S>
    ? ModelId<S>
    : Schema[P] extends ModelConstructor<infer S>[]
    ? ModelId<S>[]
    : Schema[P];
};

export type ArgsForModelClass<C extends SomeModelClass> = C extends ModelClass<
  infer Schema
>
  ? ModelArgs<Schema>
  : never;
