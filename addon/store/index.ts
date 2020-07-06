import {
  ConstructorModelSchema,
  RowForModelManager,
  RowId,
  SchemaForModelManager,
  SomeModelManager,
  IdKind,
  RowIdForDefinedModel,
} from "./manager";
import { SomeDefinedModel } from "./model";
import { Table } from "./table";

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

  lazyLocal<D extends SomeDefinedModel>(
    defined: D
  ): RowIdForDefinedModel<D, IdKind.LazyLocal> {
    let table = this.table(defined);
    return table.lazyLocal() as RowIdForDefinedModel<D, IdKind.LazyLocal>;
  }

  lazy<D extends SomeDefinedModel>(
    defined: D,
    id: string
  ): RowIdForDefinedModel<D, IdKind.LazyNotLoaded> {
    let table = this.table(defined);
    return table.lazy(id) as RowIdForDefinedModel<D, IdKind.LazyNotLoaded>;
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
    Schema extends SchemaForModelManager<D["manager"]>
  >(
    defined: D,
    args: ConstructorModelSchema<Schema>,
    id?: RowId<D["definition"], RowForModelManager<D["manager"]>, IdKind.Local>
  ): RowIdForDefinedModel<D, IdKind.Local> {
    let { manager } = defined;
    let { row, id: newId } = manager.create(
      this,
      args,
      id as RowId<D, RowForModelManager<D["manager"]>, IdKind.LazyLocal>
    );
    let table = this.table(defined);

    table.create(row as RowForModelManager<D["manager"]>, newId);
    return newId as RowIdForDefinedModel<D, IdKind.Local>;
  }

  load<
    D extends SomeDefinedModel,
    Schema extends SchemaForModelManager<D["manager"]>
  >(
    defined: D,
    args: ConstructorModelSchema<Schema>,
    id: string | RowId<D["definition"], any, IdKind.LazyNotLoaded>
  ): RowIdForDefinedModel<D, IdKind.Loaded> {
    let { manager } = defined;
    let rowId =
      typeof id === "string" ? RowId.lazy(defined.definition, id, this) : id;
    let { row, id: newId } = manager.create(this, args, rowId);
    let table = this.table(defined);

    table.load(row as any, newId);
    return newId as RowIdForDefinedModel<D, IdKind.Loaded>;
  }

  deref<Row>(id: RowId<unknown, Row, IdKind>): Row {
    let table = this.#tables.get(id.definition);

    if (table === undefined) {
      throw new Error(`BUG: RowId existed for a non-created table`);
    }

    let row = table.get(id) as Row | null;

    if (row === null) {
      throw new Error(`Attempted to deref an non-existent row`);
    }

    return row;
  }
}

export function createStore() {
  return new Store();
}
