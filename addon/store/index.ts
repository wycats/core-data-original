import {
  RowForModelManager,
  RowId,
  SchemaForModelManager,
  SomeModelManager,
  IdKind,
  RowIdForDefinedModel,
  ModelDataArgs,
  ModelMetadataArgs,
  SomeRowId,
  RowForRowId,
} from "./manager";
import { SomeDefinedModel } from "./model";
import { Table } from "./table";
import { ModelFactory } from "./definition";

export class Store {
  #tables: Map<unknown, Table<unknown, SomeModelManager>> = new Map();

  createTable<D extends SomeDefinedModel>(
    defined: D
  ): Table<D["definition"], D["manager"]> {
    let table = new Table(defined, this);
    this.#tables.set(defined.definition, table);
    return table as Table<D["definition"], D["manager"]>;
  }

  table<D extends SomeDefinedModel>(
    defined: D
  ): Table<D["definition"], D["manager"]> {
    return this.#tables.get(defined.definition) as Table<
      D["definition"],
      D["manager"]
    >;
  }

  lazyLocal<D extends SomeDefinedModel>(defined: D): RowIdForDefinedModel<D> {
    let table = this.table(defined);
    return table.lazyLocal() as RowIdForDefinedModel<D>;
  }

  lazy<D extends SomeDefinedModel>(
    defined: D,
    id: string
  ): RowIdForDefinedModel<D> {
    let table = this.table(defined);
    return table.lazy(id) as RowIdForDefinedModel<D>;
  }

  has<D extends SomeDefinedModel>(
    definition: D["definition"],
    localId: string
  ): boolean {
    let table = this.#tables.get(definition);

    if (table === undefined) {
      throw new Error(`store.has() must take a registered table definition`);
    }

    return table.has(localId);
  }

  create<
    D extends SomeDefinedModel,
    Schema extends SchemaForModelManager<D["manager"]>,
    Row extends RowForModelManager<D["manager"]>
  >(
    defined: D,
    data: ModelDataArgs<Schema>,
    meta: ModelMetadataArgs<Schema>,
    id?: RowId<D["definition"], Row>
  ): RowIdForDefinedModel<D> {
    let { manager } = defined;
    let { row, id: newId } = manager.create(
      this,
      data,
      meta,
      id as RowId<D, RowForModelManager<D["manager"]>>
    );
    let table = this.table(defined);

    table.create(row as RowForModelManager<D["manager"]>, newId);
    return newId as RowIdForDefinedModel<D>;
  }

  load<
    D extends SomeDefinedModel,
    Schema extends SchemaForModelManager<D["manager"]>
  >(
    defined: D,
    data: ModelDataArgs<Schema>,
    meta: ModelMetadataArgs<Schema>,
    id: string | RowId<D["definition"], any>
  ): RowIdForDefinedModel<D> {
    let { manager } = defined;
    let rowId =
      typeof id === "string" ? RowId.lazy(defined.definition, id, this) : id;
    let { row, id: newId } = manager.create(this, data, meta, rowId);
    let table = this.table(defined);

    table.load(row as any, newId);
    return newId as RowIdForDefinedModel<D>;
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
