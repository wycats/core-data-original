import {
  ModelArgs,
  RowForRowId,
  RowId,
  RowIdForModelClass,
  SomeRowId,
  SomeModelSchema,
} from "./manager";
import { SchemaForModelClass, SomeModelClass, ModelClass } from "./model";
import { Table } from "./table";

export class Store {
  #tables: Map<unknown, Table<SomeModelClass, any>> = new Map();

  createTable<D extends SomeModelClass>(defined: D): Table<D, InstanceType<D>> {
    let table = new Table(defined, this);
    this.#tables.set(defined, table);
    return table as Table<D, InstanceType<D>>;
  }

  table<D extends SomeModelClass>(defined: D): Table<D, InstanceType<D>> {
    return this.#tables.get(defined) as Table<D, InstanceType<D>>;
  }

  lazyLocal<D extends SomeModelClass>(defined: D): RowIdForModelClass<D> {
    let table = this.table(defined);
    return table.lazyLocal() as RowIdForModelClass<D>;
  }

  lazy<D extends SomeModelClass>(
    defined: D,
    id: string
  ): RowIdForModelClass<D> {
    let table = this.table(defined);
    return table.lazy(id) as RowIdForModelClass<D>;
  }

  has<D extends SomeModelClass>(definition: D, localId: string): boolean {
    let table = this.#tables.get(definition);

    if (table === undefined) {
      throw new Error(`store.has() must take a registered table definition`);
    }

    return table.has(localId);
  }

  create<D extends SomeModelClass>(
    defined: D,
    data: ModelArgs<SchemaForModelClass<D>>,
    id = RowId.local(defined, this) as RowIdForModelClass<D>
  ): RowIdForModelClass<D> {
    let row = new defined(this, data, id);
    let table = this.table(defined);

    table.created(row as InstanceType<D>, id as RowIdForModelClass<D>);

    return id;
  }

  load<D extends SomeModelClass, Schema extends SchemaForModelClass<D>>(
    defined: D,
    data: ModelArgs<Schema>,
    id: string | RowIdForModelClass<D>
  ): RowIdForModelClass<D> {
    let rowId =
      typeof id === "string"
        ? (RowId.lazy(defined, id, this) as RowIdForModelClass<D>)
        : id;

    let row = new defined(this, data, rowId);
    let table = this.table(defined);

    table.loaded(row as InstanceType<D>, rowId);
    return rowId;
  }

  deref<Id extends SomeRowId>(id: Id): RowForRowId<Id> {
    let table = this.#tables.get(id.definition);

    if (table === undefined) {
      throw new Error(`BUG: RowId existed for a non-created table`);
    }

    let row = table.get(id) as RowForRowId<Id> | null;

    if (row === null) {
      throw new Error(`Attempted to deref an non-existent row`);
    }

    return row;
  }
}

export function createStore() {
  return new Store();
}
