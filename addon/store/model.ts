import { Store } from "./index";
import {
  ConstructorModelSchema,
  markRowValue,
  ModelManager,
  ModelSchema,
  RowId,
  RowValue,
  ROW_VALUE,
  SomeModelManager,
  SomeRowId,
} from "./manager";
import { ModelFactory } from "./definition";

export const ARGS = Symbol("ARGS");
export const STORE = Symbol("STORE");
export const ID = Symbol("ID");

export interface DefinedModel<Definition, Manager extends SomeModelManager> {
  definition: Definition;
  manager: Manager;
}

export type SomeDefinedModel = DefinedModel<unknown, SomeModelManager>;

export type InstancePropertiesForSchema<Schema extends ModelSchema> = {
  [P in keyof Schema]: Schema[P] extends SomeDefinedModel[]
    ? HasMany<Schema[P]>
    : Schema[P] extends SomeDefinedModel
    ? BelongsTo<Schema[P]>
    : Schema[P];
};

type HasMany<R extends SomeDefinedModel[]> = R extends DefinedModel<
  unknown,
  ModelManager<unknown, ModelSchema, infer Row>
>[]
  ? Row[]
  : never;

type BelongsTo<R extends SomeDefinedModel> = R extends DefinedModel<
  unknown,
  ModelManager<unknown, ModelSchema, infer Row>
>
  ? Row
  : never;

export const MODEL_MANAGER = Symbol("MODEL_MANAGER");
export type MODEL_MANAGER = typeof MODEL_MANAGER;

export interface DelegateConstructor<Schema> {
  new (schema: Schema, store: Store): InstancePropertiesForSchema<Schema>;
}

export function ModelForSchema<
  Schema extends ModelSchema
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

function ModelConstructor<Schema extends ModelSchema>(
  store: Store,
  args: ConstructorModelSchema<Schema>,
  id: SomeRowId
) {
  /**
   * A Model class (the class itself) is a `TableId`
   */
  class Model implements RowValue {
    /** @internal */
    [ROW_VALUE]!: true;

    /** @internal */
    [ARGS]: ConstructorModelSchema<Schema>;

    /** @internal */
    readonly [STORE]: Store;

    /** @internal */
    readonly [ID]: SomeRowId;

    constructor(
      store: Store,
      args: ConstructorModelSchema<Schema>,
      id: SomeRowId
    ) {
      let row = this;

      for (const [key, value] of Object.entries(args)) {
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

      this[STORE] = store;
      this[ARGS] = args;
      this[ID] = id;

      markRowValue(this);
    }
  }

  return new Model(store, args, id) as Model &
    InstancePropertiesForSchema<Schema>;
}

export const Model = (ModelConstructor as unknown) as {
  new <Schema extends ModelSchema>(
    store: Store,
    args: ConstructorModelSchema<Schema>,
    id: SomeRowId
  ): InstancePropertiesForSchema<Schema>;
};

export interface ModelClass<Schema extends ModelSchema, Row> {
  new (store: Store, args: ConstructorModelSchema<Schema>, id: SomeRowId): Row;
}

export type SomeModelClass = ModelClass<any, any>;

export type SchemaForModelClass<
  Class extends SomeModelClass
> = Class extends ModelClass<infer Schema, unknown> ? Schema : never;
