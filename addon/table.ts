import Schema, { IdType } from "./schema";
import { assert } from "./utils";
import { SingleSelection, ENTITY, Query } from "./selection";
import { tracked } from "@glimmer/tracking";
import PrimaryKeyMap from "./primary-key-map";
import { Types } from "./database";

export type SpecifiedDataType<T extends Types, N extends keyof T & string> =
  | string
  | number
  | boolean
  | IdType
  | Entity<N>
  | SingleSelection<T, N>;

export type IdValue = string | number | boolean;
export type DataValue<T extends Types> =
  | string
  | number
  | boolean
  | null
  | IdType
  | Entity<keyof T & string>;

export function isDataMatch<T extends Types>(
  left: DataValue<T>,
  right: DataValue<T>
): boolean {
  if (isEntity(left) && isEntity(right)) {
    return left.table === right.table && isIdMatch(left.id, right.id);
  } else if (isEntity(left) || isEntity(right)) {
    return false;
  } else {
    return left === right;
  }
}

export function isIdMatch(left: PrimaryKey, right: PrimaryKey): boolean {
  if (left.length !== right.length) {
    return false;
  }

  for (let i = 0; i < left.length; i++) {
    if (left[i] !== right[i]) {
      return false;
    }
  }

  return true;
}

export function isEntity<T extends Types, N extends keyof T & string>(
  data: DataValue<T>
): data is Entity<N> {
  return data !== null && typeof data === "object" && "table" in data;
}

export function normalizeDataType<T extends Types, N extends keyof T & string>(
  data: SpecifiedDataType<T, N>
): DataValue<T> {
  if (data instanceof SingleSelection) {
    return data[ENTITY];
  } else {
    return data;
  }
}

export class InternalRow<T extends Types, N extends keyof T & string> {
  static create<T extends Types, N extends keyof T & string>(
    entity: Entity<N>,
    row: { [key: string]: SpecifiedDataType<T, N> }
  ): InternalRow<T, N> {
    // TODO: Share column names
    let columnNames = Object.keys(row);
    let columns = Object.values(row).map(v => normalizeDataType(v));

    return new InternalRow(entity, columnNames, columns) as InternalRow<T, N>;
  }

  @tracked columns: Array<DataValue<T>>;

  constructor(
    readonly entity: Entity<N>,
    private columnNames: string[],
    columns: Array<DataValue<T>>
  ) {
    this.columns = columns;
  }

  get id(): PrimaryKey {
    return this.entity.id;
  }

  update(updates: { [key: string]: DataValue<T> }): void {
    for (let i = 0; i < this.columnNames.length; i++) {
      let columnName = this.columnNames[i];

      if (columnName in updates) {
        this.columns[i] = updates[columnName];
      }
    }

    // hack: invalidate columns
    this.columns = this.columns;
  }

  select<K extends keyof T[N] & string>(
    columns: readonly K[]
  ): { [P in K]: T[N][K] } {
    let out = Object.create(null);

    for (let column of columns) {
      out[column] = this.getColumn(column);
    }

    return out;
  }

  private getColumn<K extends keyof T[N] & string>(name: K): unknown {
    let index = this.columnIndex(name);
    return this.columns[index];
  }

  private columnIndex<K extends keyof T[N] & string>(name: K): number {
    let index = this.columnNames.indexOf(name);

    assert(
      index > -1,
      `You tried to match column ${name} in table ${
        this.entity.table
      } but it didn't exist (columns: ${this.columnNames.join(", ")})`
    );

    return index;
  }

  isMatch(query: Query<T, N>): boolean {
    for (let key of Object.keys(query)) {
      let index = this.columnIndex(key as any);

      let pattern = (query as any)[key];
      let value = this.columns[index];

      if (!isDataMatch(pattern, value)) {
        return false;
      }
    }

    return true;
  }
}

export type PrimaryKey = IdValue[];

export interface Entity<T extends string> {
  table: T;
  id: PrimaryKey;
}

export type SpecifiedRow<T extends Types, N extends keyof T & string> = {
  id: PrimaryKey | string;
} & {
  [key: string]: SpecifiedDataType<T, N>;
};

export const EMPTY = Symbol("EMPTY");
export const FILTER = Symbol("FILTER");
export const ADD_ROW = Symbol("ADD_ROW");
export const SCHEMA = Symbol("SCHEMA");

export interface Type<T extends Types> {
  [key: string]: DataValue<T>;
}

export type SpecifiedQuery<T extends Types, K extends keyof T> = {
  [P in keyof T[K]]?: T[K][P];
};

export default class Table<T extends Types, N extends keyof T & string> {
  readonly map = new PrimaryKeyMap<InternalRow<T, N>>();

  constructor(readonly name: N, private schema: Schema) {}

  get [SCHEMA](): Schema {
    return this.schema;
  }

  [EMPTY](): Table<T, N> {
    return new Table(this.name, this.schema);
  }

  [FILTER](query: Query<T, N>): ReadonlyArray<Entity<N>> {
    let out = [];

    for (let row of this.map.values()) {
      if (row.isMatch(query)) {
        out.push(row.entity);
      }
    }

    return out;
  }

  [ADD_ROW](row: InternalRow<T, N>): Entity<N> {
    this.map.set(row.id, row);

    return {
      table: this.name,
      id: row.id
    };
  }

  all(): ReadonlyArray<Entity<N>> {
    let out = [];

    for (let row of this.map.values()) {
      out.push({ table: this.name, id: row.id });
    }

    return out;
  }

  first(): Entity<N> {
    for (let key of this.map.keys()) {
      return { table: this.name, id: key };
    }

    throw new Error(`Called first() on an empty database`);
  }

  get(id: PrimaryKey): InternalRow<T, N> {
    let row = this.map.get(id);
    assert(row, `Row not found (${id})`);
    return row;
  }

  add(row: SpecifiedRow<T, N>): InternalRow<T, N> {
    let userRow = InternalRow.create(
      { table: this.name, id: Array.isArray(row.id) ? row.id : [row.id] },
      row
    );
    this[ADD_ROW](userRow);
    return userRow;
  }
}
