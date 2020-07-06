import { TrackedMap } from "tracked-built-ins";
import { RowForModelManager, RowId, SomeModelManager, IdKind } from "./manager";
import { DefinedModel } from "./model";
import { Store } from "./index";

export type RowRecord<F extends readonly string[]> = {
  [P in F[number]]: unknown;
};

export class Table<D, M extends SomeModelManager> {
  #definition: D;
  #manager: M;
  #name: string;

  #rows: Map<
    string, // localId
    RowForModelManager<M>
  > = new TrackedMap();

  constructor(model: DefinedModel<D, M>, private store: Store) {
    this.#definition = model.definition;
    this.#manager = model.manager;
    this.#name = model.name;
  }

  get name(): string {
    return this.#name;
  }

  lazy(id: string): RowId<D, RowForModelManager<M>> {
    return RowId.lazy(this.#definition, id, this.store);
  }

  lazyLocal(): RowId<D, RowForModelManager<M>> {
    return RowId.lazyLocal(this.#definition, this.store);
  }

  load(
    row: RowForModelManager<M>,
    id?: RowId<D, RowForModelManager<M>>
  ): RowId<D, RowForModelManager<M>> {
    let rowId = this.#manager.getRowId(row) as RowId<D, RowForModelManager<M>>;
    this.#rows.set(rowId.localId, row);
    return rowId;
  }

  create(
    row: RowForModelManager<M>,
    id: RowId<D, RowForModelManager<M>> = RowId.local(
      this.#definition,
      this.store
    )
  ): RowId<D, RowForModelManager<M>> {
    this.#rows.set(id.localId, row);
    return id;
  }

  has(localId: string): boolean {
    return this.#rows.has(localId);
  }

  get(rowId: RowId<D, RowForModelManager<M>>): RowForModelManager<M> | null {
    return this.#rows.get(rowId.localId) || null;
  }
}
