import { LazyRowId, META, RowId, ArgsForModelClass } from "./manager";
import { SchemaForModelClass, SomeModelClass } from "./model";
import { Table } from "./table";

export class Store {
  #tables: Map<unknown, Table<SomeModelClass>> = new Map();

  createTable<D extends SomeModelClass>(defined: D): Table<D> {
    let table = new Table(defined, this);
    this.#tables.set(defined, table);
    return table as Table<D>;
  }

  table<D extends SomeModelClass>(defined: D): Table<D> {
    return this.#tables.get(defined) as Table<D>;
  }

  lazyLocal<D extends SomeModelClass>(defined: D): LazyRowId<D> {
    let table = this.table(defined);
    return table.lazyLocal();
  }

  lazyRemote<D extends SomeModelClass>(defined: D, id: string): LazyRowId<D> {
    let table = this.table(defined);
    return table.lazyRemote(id);
  }

  fillLazy<D extends SomeModelClass>(
    defined: D,
    data: ArgsForModelClass<D>,
    id: RowId<D>
  ): void {
    let row = new defined(this, data, id);
    let table = this.table(defined);
    console.log("ROW", row);

    table.fillLazy(id, row as InstanceType<D>, data, data[META]);
  }

  updatePresent<D extends SomeModelClass>(
    id: RowId<D>,
    data: ArgsForModelClass<D>
  ): void {
    let table = this.table(id.definition);

    table.updatePresent(id, data);
  }

  updateMeta<D extends SomeModelClass>(
    id: RowId<D>,
    meta: InstanceType<D>[META]
  ): void {
    let table = this.table(id.definition);
    table.updateMeta(id, meta);
  }

  create<D extends SomeModelClass>(
    defined: D,
    data: ArgsForModelClass<D>
  ): LazyRowId<D> {
    let id = LazyRowId.local<D>(defined, this);
    let row = new defined(this, data, id);
    let table = this.table(defined);

    table.initializeLocal(id, data, data[META]);

    return id;
  }

  load<D extends SomeModelClass>(
    defined: D,
    data: ArgsForModelClass<D>,
    id: string | RowId<D>
  ): RowId<D> {
    let rowId =
      typeof id === "string" ? LazyRowId.remote(defined, id, this) : id;

    let row = new defined(this, data, rowId) as InstanceType<D>;
    let table = this.table(defined);

    table.initializeRemote(rowId, data);
    return rowId;
  }

  meta<C extends SomeModelClass>(id: RowId<C>): InstanceType<C>[META] {
    let table = this.#tables.get(id.definition);

    if (table === undefined) {
      throw new Error(`BUG: RowId existed for a non-created table`);
    }

    let record = table.get(id);

    if (record === null) {
      throw new Error(`Attempted to deref an non-existent row`);
    }

    return record.id.meta;
  }

  data<C extends SomeModelClass>(id: RowId<C>): ArgsForModelClass<C> {
    let table = this.#tables.get(id.definition) as Table<C>;

    if (table === undefined) {
      throw new Error(`BUG: RowId existed for a non-created table`);
    }

    let record = table.get(id);

    if (record === null) {
      throw new Error(`Attempted to get data for an non-existent row`);
    }

    let data = record.data;

    if (data === null) {
      throw new Error(`Attempted to get data for a lazy row`);
    }

    return data;
  }

  deref<C extends SomeModelClass>(id: RowId<C>): InstanceType<C> {
    let table = this.#tables.get(id.definition) as Table<C>;

    if (table === undefined) {
      throw new Error(`BUG: RowId existed for a non-created table`);
    }

    let record = table.get(id);

    if (record === null) {
      throw new Error(`Attempted to deref an non-existent row`);
    }

    return new id.definition(this, record._data, id) as InstanceType<C>;
  }
}

export function createStore() {
  return new Store();
}
