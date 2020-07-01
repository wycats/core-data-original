import {
  ModelArgs,
  ModelManager,
  RowId,
  SomeModelManager,
  ArgsForModelManager,
  RowForModelManager,
} from "./manager";
import { DefinedModel, ModelDefinition, SomeDefinedModel } from "./model";
import { Table } from "./table";

function assertNotNever<T>(o: T | never): asserts o is T {}

export class Store {
  #tables: Map<unknown, Table<unknown, SomeModelManager>> = new Map();

  createTable<D extends SomeDefinedModel>(
    defined: D
  ): Table<D["definition"], D["manager"]> {
    let table = new Table(defined);
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

  create<
    D extends SomeDefinedModel,
    Args extends ArgsForModelManager<D["manager"]>
  >(
    defined: D,
    args: Args,
    id?: RowId<D["definition"], RowForModelManager<D["manager"]>>
  ): RowId<D["definition"], RowForModelManager<D["manager"]>> {
    let { manager } = defined;
    let row = manager.create(this, args, id) as RowForModelManager<
      D["manager"]
    >;
    let table = this.table(defined);
    let newId = manager.getRowId(row) as RowId<
      D["definition"],
      RowForModelManager<D["manager"]>
    >;

    table.add(row, newId);
    return newId;
  }

  // load<Args extends ModelData, TableId extends object, Row>(
  //   manager: ModelManager<Args, TableId, Row>,
  //   args: Args,
  //   id: string
  // ): RowId<TableId, Row> {
  //   return manager.create(this, args, RowId.remote(manager.getTableId(), id));
  // }

  deref<Row, M extends ModelManager<unknown, ModelArgs, Row>>(
    id: RowId<unknown, Row>
  ): Row {
    let table = this.#tables.get(id.table);

    if (table === undefined) {
      throw new Error(`BUG: RowId existed for a non-created table`);
    }

    return table.get(id) as RowForModelManager<M>;
  }
}

export function createStore() {
  return new Store();
}
