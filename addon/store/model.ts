import { Store } from "./index";
import {
  markRowValue,
  META,
  RowId,
  RowValue,
  ROW_VALUE,
  SomeModelSchema,
  SomeRowId,
  ModelSchema,
  ModelArgs,
} from "./manager";

export const DATA_STORAGE = Symbol("DATA_STORAGE");
export const META_STORAGE = Symbol("META_STORAGE");
export const STORE = Symbol("STORE");
export const ID = Symbol("ID");

export class ModelConstructor<Schema extends SomeModelSchema> {
  static get manager() {
    return this;
  }

  static get definition() {
    return this;
  }

  /** @internal */
  [ROW_VALUE]!: true;

  /** @internal */
  [DATA_STORAGE]: ModelArgs<Schema>;

  /** @internal */
  readonly [STORE]: Store;

  /** @internal */
  readonly [ID]: SomeRowId;

  get [META](): Schema[META] {
    return this[STORE].meta(this[ID]);
  }

  constructor(store: Store, data: ModelArgs<Schema>, id: SomeRowId) {
    if (!(id instanceof RowId)) {
      throw new Error(`assert: must provide a RowId when cosntructing a Model`);
    }

    let row = this;

    for (const [key, value] of Object.entries(data)) {
      if (value instanceof RowId) {
        Object.defineProperty(row, key, {
          enumerable: true,
          configurable: true,
          get() {
            let belongsTo = store.data(this[ID])[key] as SomeRowId;
            return store.deref(belongsTo);
          },
        });
      } else if (
        Array.isArray(value) &&
        value.every((item: unknown[]) => item instanceof RowId)
      ) {
        // TODO: A better rule for "looks like a has-many array" if possible
        Object.defineProperty(row, key, {
          enumerable: true,
          configurable: true,
          get() {
            let hasMany = store.data(this[ID])[key] as SomeRowId[];
            return hasMany.map((item) => store.deref(item));
          },
        });
      } else {
        Object.defineProperty(row, key, {
          enumerable: true,
          configurable: true,
          get() {
            return store.data(this[ID])[key];
          },
        });
      }
    }

    this[STORE] = store;
    this[DATA_STORAGE] = data;
    this[ID] = id;

    markRowValue(this);
  }
}

export const Model = ModelConstructor as {
  [P in keyof typeof ModelConstructor]: typeof ModelConstructor[P];
} & {
  new <S extends SomeModelSchema>(...args: any[]): Readonly<S> &
    ModelConstructor<S>;
};

export type Model<_S extends SomeModelSchema> = typeof Model;

export type SomeModel = ModelConstructor<SomeModelSchema>;

export interface ModelClass<Schema extends SomeModelSchema> {
  new (store: Store, data: ModelArgs<Schema>, id: SomeRowId): ModelConstructor<
    Schema
  >;
}

export type SomeModelClass = {
  new (...args: any[]): ModelConstructor<SomeModelSchema>;
};

export type MetaForModelClass<Class extends SomeModelClass> = InstanceType<
  Class
>[META];

export type SchemaForModelClass<Class extends SomeModelClass> = Class extends {
  new (...args: any[]): ModelConstructor<infer Schema>;
}
  ? Schema
  : never;
