import { v4 } from "ember-uuid";
import { Store } from "./index";
import { DefinedModel, SomeDefinedModel } from "./model";

export enum IdKind {
  Local = "Local",
  LazyLocal = "LazyLocal",
  LazyNotLoaded = "LazyNotLoaded",
  Loaded = "Loaded",
}

export type PresentId = IdKind.Loaded | IdKind.Local;
export type LazyId = IdKind.LazyLocal | IdKind.LazyNotLoaded;

export class RowId<Definition, _Row> {
  static local<Definition, Row>(
    name: Definition,
    store: Store
  ): RowId<Definition, Row> {
    return new RowId(name, v4(), null, store);
  }

  static lazy<Definition, Row>(
    name: Definition,
    id: string,
    store: Store
  ): RowId<Definition, Row> {
    return new RowId(name, v4(), id, store);
  }

  static lazyLocal<Definition, Row>(
    name: Definition,
    store: Store
  ): RowId<Definition, Row> {
    return new RowId(name, v4(), null, store);
  }

  static loaded<Definition, Row>(
    name: Definition,
    id: string,
    store: Store
  ): RowId<Definition, Row> {
    return new RowId(name, v4(), id, store);
  }

  constructor(
    readonly definition: Definition,
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

export type SomeRowId = RowId<any, any>;

export type RowForRowId<Id extends SomeRowId> = Id extends RowId<any, infer Row>
  ? Row
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
  [P in string]: unknown | SomeDefinedModel | SomeDefinedModel[];
};

export const META = Symbol("META");
export type META = typeof META;

export type ModelSchema<D extends ModelData, Metadata> = {
  [P in keyof D]: D[P];
} & {
  [META]: Metadata;
};

export type SomeModelSchema = ModelSchema<any, any>;

export type RowIdForDefinedModel<
  S extends SomeDefinedModel
> = S extends DefinedModel<
  unknown,
  ModelManager<infer Definition, SomeModelSchema, infer Row>
>
  ? RowId<Definition, Row>
  : never;

export type RowIdForDefinedModels<
  S extends SomeDefinedModel[]
> = S extends DefinedModel<
  unknown,
  ModelManager<infer Definition, SomeModelSchema, infer Row>
>[]
  ? RowId<Definition, Row>[]
  : never;

export type ModelSchemaForDefinedModels<
  S extends SomeDefinedModel[],
  I extends IdKind = IdKind
> = S extends DefinedModel<unknown, ModelManager<any, infer ModelSchema, any>>[]
  ? ModelSchema
  : never;

export type ModelDataArgs<Schema extends SomeModelSchema> = {
  [P in keyof Schema["data"]]: Schema["data"][P] extends SomeDefinedModel
    ? RowIdForDefinedModel<Schema["data"][P]>
    : Schema["data"][P] extends SomeDefinedModel[]
    ? RowIdForDefinedModels<Schema["data"][P]>
    : Schema["data"][P];
};

export type ModelMetadataArgs<Schema extends SomeModelSchema> = {
  [P in keyof Schema["meta"]]: Schema["meta"][P] extends SomeDefinedModel
    ? RowIdForDefinedModel<Schema["meta"][P]>
    : Schema["meta"][P] extends SomeDefinedModel[]
    ? RowIdForDefinedModels<Schema["meta"][P]>
    : Schema["meta"][P];
};

export interface ModelManager<Definition, Schema extends SomeModelSchema, Row> {
  create(
    store: Store,
    data: Schema[string],
    meta: Schema[META],
    id?: RowId<Definition, Row>
  ): { id: RowId<Definition, Row>; row: Row };
  getRowId(bucket: Row): RowId<Definition, Row>;
}

export type SomeModelManager = ModelManager<unknown, SomeModelSchema, unknown>;

export type SchemaForModelManager<
  M extends SomeModelManager
> = M extends ModelManager<unknown, infer Schema, unknown> ? Schema : never;

export type RowForModelManager<
  M extends SomeModelManager
> = M extends ModelManager<unknown, SomeModelSchema, infer Row> ? Row : never;
