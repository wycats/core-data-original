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

export class RowId<Definition, Row, Kind extends IdKind> {
  static local<Definition, Row>(
    name: Definition,
    store: Store
  ): RowId<Definition, Row, IdKind.Local> {
    return new RowId(name, v4(), null, store);
  }

  static lazy<Definition, Row>(
    name: Definition,
    id: string,
    store: Store
  ): RowId<Definition, Row, IdKind.LazyNotLoaded> {
    return new RowId(name, v4(), id, store);
  }

  static lazyLocal<Definition, Row>(
    name: Definition,
    store: Store
  ): RowId<Definition, Row, IdKind.LazyLocal> {
    return new RowId(name, v4(), null, store);
  }

  static loaded<Definition, Row>(
    name: Definition,
    id: string,
    store: Store
  ): RowId<Definition, Row, IdKind.Loaded> {
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

export type SomeRowId = RowId<any, any, any>;

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

export type ModelSchema = {
  [P in keyof object]: unknown | SomeDefinedModel | SomeDefinedModel[];
};

export type RowIdForDefinedModel<
  S extends SomeDefinedModel,
  I extends IdKind = IdKind
> = S extends DefinedModel<
  unknown,
  ModelManager<infer Definition, ModelSchema, infer Row>
>
  ? RowId<Definition, Row, I>
  : never;

export type RowIdForDefinedModels<
  S extends SomeDefinedModel[],
  I extends IdKind = IdKind
> = S extends DefinedModel<
  unknown,
  ModelManager<infer Definition, ModelSchema, infer Row>
>[]
  ? RowId<Definition, Row, I>[]
  : never;

export type ConstructorModelSchema<Schema extends ModelSchema> = {
  [P in keyof Schema]: Schema[P] extends SomeDefinedModel
    ? RowIdForDefinedModel<Schema[P]>
    : Schema[P] extends SomeDefinedModel[]
    ? RowIdForDefinedModels<Schema[P]>
    : Schema[P];
};

export interface ModelManager<Definition, Schema extends ModelSchema, Row> {
  create(
    store: Store,
    data: Schema,
    id?: RowId<Definition, Row, IdKind.LazyLocal>
  ): { id: RowId<Definition, Row, IdKind.Local>; row: Row };
  getRowId(bucket: Row): RowId<Definition, Row, IdKind.Loaded>;
}

export type SomeModelManager = ModelManager<unknown, ModelSchema, unknown>;

export type SchemaForModelManager<
  M extends SomeModelManager
> = M extends ModelManager<unknown, infer Schema, unknown> ? Schema : never;

export type RowForModelManager<
  M extends SomeModelManager
> = M extends ModelManager<unknown, ModelSchema, infer Row> ? Row : never;
