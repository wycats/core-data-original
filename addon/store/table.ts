import { TrackedMap } from "tracked-built-ins";
import { RowForModelManager, RowId, SomeModelManager } from "./manager";
import { SomeDefinedModel, DefinedModel } from "./model";

export type RowRecord<F extends readonly string[]> = {
  [P in F[number]]: unknown;
};

export class Table<D, M extends SomeModelManager> {
  #definition: D;
  #manager: M;

  #rows: Map<
    RowId<D, RowForModelManager<M>>,
    RowForModelManager<M>
  > = new TrackedMap();

  constructor(model: DefinedModel<D, M>) {
    this.#definition = model.definition;
    this.#manager = model.manager;
  }

  preload(id: string): RowId<D, RowForModelManager<M>> {
    return RowId.remote(this.#definition, id);
  }

  load(row: RowForModelManager<M>): RowId<D, RowForModelManager<M>> {
    let rowId = this.#manager.getRowId(row) as RowId<D, RowForModelManager<M>>;
    this.#rows.set(rowId, row);
    return rowId;
  }

  preadd(): RowId<D, RowForModelManager<M>> {
    return RowId.local(this.#definition);
  }

  add(
    row: RowForModelManager<M>,
    id = RowId.local(this.#definition)
  ): RowId<D, RowForModelManager<M>> {
    this.#rows.set(id, row);
    return id;
  }

  get(rowId: RowId<D, RowForModelManager<M>>): RowForModelManager<M> | null {
    return this.#rows.get(rowId) || null;
  }
}
