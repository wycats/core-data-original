import Schema from "./schema";
import { INTERNAL_ROW, MultipleSelection, SingleSelection } from "./selection";
import Table, {
  DataValue,
  EMPTY,
  Entity,
  InternalRow,
  SCHEMA,
  SpecifiedRow,
  PrimaryKey,
} from "./table";
import { expect } from "./utils";

interface FakeData {
  [key: string]: () => unknown;
}

export const FIND = Symbol("FIND");

export interface Types {
  // [key: string]: Type<Types>;
}

export default class Database<T extends Types> {
  static create<T extends Types>(): Database<T> {
    return new Database(new Map());
  }

  readonly tables = new Map<keyof T, Table<T, keyof T & string>>();

  private constructor(tables: Map<keyof T, Table<T, keyof T & string>>) {
    this.tables = tables;
  }

  define<N extends keyof T & string>(name: N, schema: Schema) {
    this.tables.set(name, new Table(name, schema));
  }

  empty(): Database<T> {
    let tables = new Map();

    for (let [key, table] of this.tables) {
      tables.set(key, table[EMPTY]());
    }

    return new Database(tables);
  }

  [FIND]<N extends keyof T & string>(entity: Entity<N>): InternalRow<T, N> {
    let table: Table<T, N> = this.get(entity.table);
    return table.get(entity.id);
  }

  first<N extends keyof T & string>(name: N): SingleSelection<T, N> {
    let table = this.get(name);
    return new SingleSelection(this, table.first());
  }

  all<N extends keyof T & string>(name: N & keyof T): MultipleSelection<T, N> {
    return new MultipleSelection(this, name);
  }

  find<N extends keyof T & string>(name: N, id: string): SingleSelection<T, N>;
  find<N extends keyof T & string>(entity: Entity<N>): SingleSelection<T, N>;
  find<N extends keyof T & string>(
    nameOrEntity: N | Entity<N>,
    id?: string
  ): SingleSelection<T, N> {
    if (typeof nameOrEntity === "string") {
      this.get(nameOrEntity);

      return new SingleSelection(this, {
        table: nameOrEntity,
        id: [id as string]
      });
    } else {
      this.get(nameOrEntity.table);

      return new SingleSelection(this, {
        table: nameOrEntity.table,
        id: nameOrEntity.id
      });
    }
  }

  get<N extends keyof T & string>(name: N): Table<T, N> {
    let table = this.tables.get(name);
    expect(table, `Unexpected table name ${name}`);
    return table as Table<T, N>;
  }

  update<N extends keyof T & string>(
    entity: Entity<N>,
    updates: { [key: string]: DataValue<T> }
  ) {
    let row = this.find(entity);
    row[INTERNAL_ROW].update(updates);
  }

  add<N extends keyof T & string>(
    name: N,
    row: SpecifiedRow<T, N>,
  ): void {
    let table = this.get(name);
    table.add(row);
  }

  populate<N extends keyof T & string>(
    name: N,
    data: FakeData,
    amount: number
  ): Entity<N>[] {
    let table = this.get(name);
    let schema = table[SCHEMA];

    let out: Entity<N>[] = [];

    for (let i = 0; i < amount; i++) {
      out.push(table.add(fake(data, schema)).entity);
    }

    return out;
  }

  nextId(): PrimaryKey {
    return [`${ID++}`];
  }
}

let ID = 1;

function fake<T extends Types, N extends keyof T & string>(
  data: FakeData,
  schema: Schema
): SpecifiedRow<T, N> {
  let out = Object.create(null);

  for (let key of Object.keys(data)) {
    out[key] = data[key]();
  }

  let idColumns = schema.id.columns;

  if ("id" in data) {
    out.id = idColumns.map(column => out[column]);
  } else {
    out.id = [`${ID++}`];
  }

  return out;
}
