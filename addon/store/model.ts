import { Store } from "./index";
import {
  markRowValue,
  META,
  ModelArgs,
  RowId,
  RowValue,
  ROW_VALUE,
  SomeModelSchema,
  SomeRowId,
  ModelSchema,
} from "./manager";

export const DATA_STORAGE = Symbol("DATA_STORAGE");
export const META_STORAGE = Symbol("META_STORAGE");
export const STORE = Symbol("STORE");
export const ID = Symbol("ID");

export const MODEL_MANAGER = Symbol("MODEL_MANAGER");
export type MODEL_MANAGER = typeof MODEL_MANAGER;

export interface DelegateConstructor<Schema extends SomeModelSchema> {
  new (schema: Schema, store: Store): ModelArgs<Schema>;
}

export function ModelForSchema<
  Schema extends SomeModelSchema
>(): DelegateConstructor<Schema> {
  return (function () {
    function DelegatingClass(this: any, schema: Schema, store: Store) {
      let row = this;

      for (const [key, value] of Object.entries(schema)) {
        if (value instanceof RowId) {
          Object.defineProperty(row, key, {
            enumerable: true,
            configurable: true,
            get() {
              return store.deref(value);
            },
          });
        } else if (
          Array.isArray(value) &&
          value.every((item) => item instanceof RowId)
        ) {
          // TODO: A better rule for "looks like a has-many array" if possible
          Object.defineProperty(row, key, {
            enumerable: true,
            configurable: true,
            get() {
              return value.map((item) => store.deref(item));
            },
          });
        } else {
          Object.defineProperty(row, key, {
            enumerable: true,
            configurable: true,
            get() {
              return value;
            },
          });
        }
      }
    }

    return DelegatingClass;
  })() as any;
}

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
  [META_STORAGE]: Schema[META];

  /** @internal */
  readonly [STORE]: Store;

  /** @internal */
  readonly [ID]: SomeRowId;

  get [META](): Schema[META] {
    return this[META_STORAGE];
  }

  constructor(store: Store, data: ModelArgs<Schema>, id: SomeRowId) {
    let row = this;

    for (const [key, value] of Object.entries(data)) {
      if (value instanceof RowId) {
        Object.defineProperty(row, key, {
          enumerable: true,
          configurable: true,
          get() {
            return store.deref(value);
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
            return value.map((item: SomeRowId) => store.deref(item));
          },
        });
      } else {
        Object.defineProperty(row, key, {
          enumerable: true,
          configurable: true,
          get() {
            return value;
          },
        });
      }
    }

    this[STORE] = store;
    this[DATA_STORAGE] = data;
    this[META_STORAGE] = data[META];
    this[ID] = id;

    markRowValue(this);
  }
}

export const Model = ModelConstructor as {
  [P in keyof typeof ModelConstructor]: typeof ModelConstructor[P];
} & {
  new <S extends SomeModelSchema>(...args: any[]): S & ModelConstructor<S>;
};

export type Model<S extends SomeModelSchema> = typeof Model;

export type SomeModel = ModelConstructor<SomeModelSchema>;

export interface ModelClass<Schema extends SomeModelSchema> {
  new (store: Store, data: ModelArgs<Schema>, id: SomeRowId): ModelConstructor<
    Schema
  >;
}

export type SomeModelClass = { new (...args: any[]): ModelConstructor<any> };

export type RowForModelClass<Class extends SomeModelClass> = InstanceType<
  Class
>;

export type SchemaForModelClass<Class extends SomeModelClass> = Class extends {
  new (...args: any[]): ModelConstructor<infer Schema>;
}
  ? Schema
  : never;
