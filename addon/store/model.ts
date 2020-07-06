import { Store } from "./index";
import {
  markRowValue,
  ModelManager,
  ModelData,
  RowId,
  RowValue,
  ROW_VALUE,
  SomeModelManager,
  SomeRowId,
  SomeModelSchema,
  ModelMetadataArgs,
  ModelDataArgs,
} from "./manager";

export const DATA_STORAGE = Symbol("DATA_STORAGE");
export const META_STORAGE = Symbol("META_STORAGE");
export const STORE = Symbol("STORE");
export const ID = Symbol("ID");

export interface DefinedModel<Definition, Manager extends SomeModelManager> {
  name: string;
  definition: Definition;
  manager: Manager;
}

export type SomeDefinedModel = DefinedModel<unknown, SomeModelManager>;

export type InstancePropertiesForSchema<Schema extends SomeModelSchema> = {
  [P in keyof Schema]: Schema[P] extends SomeDefinedModel[]
    ? HasMany<Schema[P]>
    : Schema[P] extends SomeDefinedModel
    ? BelongsTo<Schema[P]>
    : Schema[P];
};

type HasMany<R extends SomeDefinedModel[]> = R extends DefinedModel<
  any,
  ModelManager<any, any, infer Row>
>[]
  ? Row[]
  : never;

type BelongsTo<R extends SomeDefinedModel> = R extends DefinedModel<
  any,
  ModelManager<any, any, infer Row>
>
  ? Row
  : never;

export const MODEL_MANAGER = Symbol("MODEL_MANAGER");
export type MODEL_MANAGER = typeof MODEL_MANAGER;

export interface DelegateConstructor<Schema extends SomeModelSchema> {
  new (schema: Schema, store: Store): InstancePropertiesForSchema<Schema>;
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

function ModelConstructor<Schema extends SomeModelSchema>(
  store: Store,
  data: ModelDataArgs<Schema>,
  meta: ModelMetadataArgs<Schema>,
  id: SomeRowId
) {
  /**
   * A Model class (the class itself) is a `TableId`
   */
  class Model implements RowValue {
    /** @internal */
    [ROW_VALUE]!: true;

    /** @internal */
    [DATA_STORAGE]: ModelDataArgs<Schema>;

    /** @internal */
    [META_STORAGE]: unknown;

    /** @internal */
    readonly [STORE]: Store;

    /** @internal */
    readonly [ID]: SomeRowId;

    constructor(
      store: Store,
      data: ModelDataArgs<Schema>,
      meta: ModelMetadataArgs<Schema>,
      id: SomeRowId
    ) {
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
      this[META_STORAGE] = meta;
      this[ID] = id;

      markRowValue(this);
    }
  }

  return new Model(store, data, meta, id) as Model &
    InstancePropertiesForSchema<Schema>;
}

export const Model = (ModelConstructor as unknown) as {
  new <Schema extends SomeModelSchema>(
    store: Store,
    data: ModelDataArgs<Schema>,
    meta: ModelMetadataArgs<Schema>,
    id: SomeRowId
  ): InstancePropertiesForSchema<Schema>;
};

export interface ModelClass<Schema extends SomeModelSchema, Row> {
  new (
    store: Store,
    args: ModelDataArgs<Schema>,
    meta: ModelMetadataArgs<Schema>,
    id: SomeRowId
  ): Row;
}

export type SomeModelClass = ModelClass<any, any>;

export type RowForModelClass<
  Class extends SomeModelClass
> = Class extends ModelClass<any, infer Row> ? Row : never;

export type SchemaForModelClass<
  Class extends SomeModelClass
> = Class extends ModelClass<infer Schema, unknown> ? Schema : never;
