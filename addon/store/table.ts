import { TrackedMap } from "tracked-built-ins";
import { Store } from "./index";
import { META, RowId, SomeModelSchema, RowIdForModelClass } from "./manager";
import { ID, ModelClass, SomeModelClass } from "./model";

export type RowRecord<F extends readonly string[]> = {
  [P in F[number]]: unknown;
};

export class Table<D extends SomeModelClass, Row extends InstanceType<D>> {
  #definition: D;
  #name: string;

  #rows: Map<
    string, // localId
    Row
  > = new TrackedMap();

  constructor(model: D, private store: Store) {
    this.#definition = model;
    this.#name = model.name;
  }

  get name(): string {
    return this.#name;
  }

  lazy(id: string): RowId<D, Row[META], Row> {
    return RowId.lazy(this.#definition, id, this.store);
  }

  lazyLocal(): RowId<D, Row[META], Row> {
    return RowId.lazyLocal(this.#definition, this.store);
  }

  loaded(row: Row, id?: RowId<D, Row[META], Row>): RowId<D, Row[META], Row> {
    let rowId = row[ID];
    // let rowId = this.#manager.getRowId(row) as RowIdForModelManager<M>;
    this.#rows.set(rowId.localId, row);
    return rowId;
  }

  created(
    row: Row,
    id = RowId.local(this.#definition, this.store) as RowId<D, Row[META], Row>
  ): RowId<D, Row[META], Row> {
    this.#rows.set(id.localId, row);
    return id;
  }

  has(localId: string): boolean {
    return this.#rows.has(localId);
  }

  get(rowId: RowIdForModelClass<D>): Row | null {
    return this.#rows.get(rowId.localId) || null;
  }
}
