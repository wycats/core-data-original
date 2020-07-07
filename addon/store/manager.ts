import { v4 } from "ember-uuid";
import { Store } from "./index";
import {
  SomeModelClass,
  ModelClass,
  Model,
  SomeModel,
  ModelConstructor,
} from "./model";

export enum IdKind {
  Local = "Local",
  LazyLocal = "LazyLocal",
  LazyNotLoaded = "LazyNotLoaded",
  Loaded = "Loaded",
}

export type PresentId = IdKind.Loaded | IdKind.Local;
export type LazyId = IdKind.LazyLocal | IdKind.LazyNotLoaded;

export class RowId<Definition extends SomeModelClass, Meta, _Row> {
  static local<Definition extends SomeModelClass, Meta, Row>(
    name: Definition,
    store: Store,
    meta: Meta | null = null
  ): RowId<Definition, Meta, Row> {
    return new RowId(name, meta, v4(), null, store);
  }

  static lazy<Definition extends SomeModelClass, Meta, Row>(
    name: Definition,
    id: string,
    store: Store,
    meta: Meta | null = null
  ): RowId<Definition, Meta, Row> {
    return new RowId(name, meta, v4(), id, store);
  }

  static lazyLocal<Definition extends SomeModelClass, Meta, Row>(
    name: Definition,
    store: Store,
    meta: Meta | null = null
  ): RowId<Definition, Meta, Row> {
    return new RowId(name, meta, v4(), null, store);
  }

  static loaded<Definition extends SomeModelClass, Meta, Row>(
    name: Definition,
    id: string,
    store: Store,
    meta: Meta | null = null
  ): RowId<Definition, Meta, Row> {
    return new RowId(name, meta, v4(), id, store);
  }

  constructor(
    readonly definition: Definition,
    readonly meta: Meta | null,
    readonly localId: string,
    private remoteId: string | null = null,
    private store: Store
  ) {}

  get kind(): IdKind {
    if (this.remoteId === null) {
      if (this.store.has(this.definition, this.localId)) {
        return IdKind.Local;
      } else {
        return IdKind.LazyLocal;
      }
    } else {
      if (this.store.has(this.definition, this.localId)) {
        return IdKind.Loaded;
      } else {
        return IdKind.LazyNotLoaded;
      }
    }
  }
}

export type SomeRowId = RowId<any, any, any>;

export type RowForRowId<Id extends SomeRowId> = Id extends RowId<
  any,
  any,
  infer Row
>
  ? Row
  : never;

export type MetaForRowId<Id extends SomeRowId> = Id extends RowId<
  any,
  infer Meta,
  any
>
  ? Meta
  : never;

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

export type RowIdForModelClass<C extends SomeModelClass> = C extends ModelClass<
  infer Schema
>
  ? RowId<C, InstanceType<C>[META], InstanceType<C>>
  : never;

export type ModelArgs<Schema extends SomeModelSchema> = {
  [P in keyof Schema]: Schema[P] extends ModelConstructor<infer Schema>
    ? RowId<ModelClass<Schema>, Schema[META], Model<Schema>>
    : Schema[P] extends ModelConstructor<infer Schema>[]
    ? RowId<ModelClass<Schema>, Schema[META], Model<Schema>>[]
    : Schema[P];
};
