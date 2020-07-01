import { Store } from "./index";
import {
  ModelArgs,
  RowId,
  RowValue,
  ROW_VALUE,
  markRowValue,
  ModelManager,
  SomeModelManager,
} from "./manager";

export const DATA = Symbol("DATA");
export const STORE = Symbol("STORE");
export const ID = Symbol("ID");

export interface ModelClass<Args extends ModelArgs, Row extends Model<any>> {
  new (store: Store, data: Args, id: RowId<this, Row>): Row;
}

export type SomeModelClass = ModelClass<any, Model<any>>;

export type ArgsForModelClass<
  M extends ModelClass<any, any>
> = M extends ModelClass<infer Args, Model<ModelArgs>> ? Args : never;

export type RowForModelClass<
  M extends ModelClass<any, any>
> = M extends ModelClass<ModelArgs, infer Row> ? Row : never;

export const MODEL_MANAGER = Symbol("MODEL_MANAGER");
export type MODEL_MANAGER = typeof MODEL_MANAGER;

export type ModelDefinition = unknown;

export interface DefinedModel<Definition, Manager extends SomeModelManager> {
  definition: Definition;
  manager: Manager;
}

export type SomeDefinedModel = DefinedModel<unknown, SomeModelManager>;

/**
 * A Model class (the class itself) is a `TableId`
 */
export class Model<Args extends ModelArgs> implements RowValue {
  [ROW_VALUE]!: true;

  [DATA]: Args;
  readonly [STORE]: Store;
  readonly [ID]: RowId<unknown, unknown>;

  constructor(store: Store, data: Args, id: RowId<unknown, unknown>) {
    this[STORE] = store;
    this[DATA] = data;
    this[ID] = id;

    markRowValue(this);
  }
}

export type SomeModel = Model<ModelArgs>;
