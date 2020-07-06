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

  #rows: Map<
    string, // localId
    RowForModelManager<M>
  > = new TrackedMap();

  constructor(model: DefinedModel<D, M>, private store: Store) {
    this.#definition = model.definition;
    this.#manager = model.manager;
  }

  lazy(id: string): RowId<D, RowForModelManager<M>, IdKind.LazyNotLoaded> {
    return RowId.lazy(this.#definition, id, this.store);
  }

  lazyLocal(): RowId<D, RowForModelManager<M>, IdKind.LazyLocal> {
    return RowId.lazyLocal(this.#definition, this.store);
  }

  load(
    row: RowForModelManager<M>,
    id?: RowId<D, RowForModelManager<M>, IdKind.LazyNotLoaded>
  ): RowId<D, RowForModelManager<M>, IdKind.Loaded> {
    let rowId = this.#manager.getRowId(row) as RowId<
      D,
      RowForModelManager<M>,
      IdKind.Loaded
    >;
    this.#rows.set(rowId.localId, row);
    return rowId;
  }

  create(
    row: RowForModelManager<M>,
    id: RowId<D, RowForModelManager<M>, IdKind.LazyLocal> = RowId.local(
      this.#definition,
      this.store
    )
  ): RowId<D, RowForModelManager<M>, IdKind.Local> {
    this.#rows.set(id.localId, row);
    return id;
  }

  has(localId: string): boolean {
    return this.#rows.has(localId);
  }

  get(
    rowId: RowId<D, RowForModelManager<M>, IdKind.Loaded | IdKind.Local>
  ): RowForModelManager<M> | null {
    return this.#rows.get(rowId.localId) || null;
  }
}
