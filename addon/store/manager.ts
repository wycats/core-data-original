import { v4 } from "ember-uuid";
import { Store } from "./index";

enum IdKind {
  Local,
  Remote,
}

export class RowId<Definition, Row> {
  static local<Definition, Row>(name: Definition): RowId<Definition, Row> {
    return new RowId(name, v4(), IdKind.Local);
  }

  static remote<Definition, Row>(
    name: Definition,
    id: string
  ): RowId<Definition, Row> {
    return new RowId(name, id, IdKind.Remote);
  }

  constructor(
    readonly table: Definition,
    readonly id: string,
    readonly kind: IdKind
  ) {}
}

export const ROW_VALUE = Symbol("PHANTOM: ROW_VALUE");

export interface RowValue {
  [ROW_VALUE]: true;
}

export const ROW_VALUE_MAP = new WeakMap<object, true>();

export function markRowValue<T extends object>(value: T): T & RowValue {
  ROW_VALUE_MAP.set(value, true);
  return value as T & RowValue;
}

export type ModelArgs = {
  [P in keyof object]: unknown | RowValue | RowValue[];
};

export interface ModelManager<Definition, Args extends ModelArgs, Row> {
  create(store: Store, data: Args, id?: RowId<Definition, Row>): Row;
  getRowId(bucket: Row): RowId<Definition, Row>;
}

export type SomeModelManager = ModelManager<unknown, ModelArgs, unknown>;

export type ArgsForModelManager<
  M extends SomeModelManager
> = M extends ModelManager<unknown, infer Args, unknown> ? Args : never;

export type RowForModelManager<
  M extends SomeModelManager
> = M extends ModelManager<unknown, ModelArgs, infer Row> ? Row : never;
