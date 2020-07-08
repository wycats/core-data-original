import { TrackedMap, tracked } from "tracked-built-ins";
import { Store } from "./index";
import {
  META,
  RowId,
  SomeRowId,
  LazyRowId,
  ArgsForModelClass,
} from "./manager";
import {
  ID,
  ModelClass,
  SomeModelClass,
  META_STORAGE,
  SchemaForModelClass,
  MetaForModelClass,
} from "./model";

export type RowRecord<F extends readonly string[]> = {
  [P in F[number]]: unknown;
};

export class Record<D extends SomeModelClass> {
  @tracked _data: ArgsForModelClass<D> | null;

  constructor(readonly id: RowId<D>, data: ArgsForModelClass<D> | null) {
    this._data = data;
  }

  updateMeta(meta: MetaForModelClass<D>): void {
    this.id.updateMeta(meta);
  }

  updateData(data: ArgsForModelClass<D>): void {
    this._data = data;
  }

  get data(): ArgsForModelClass<D> | null {
    return this._data;
  }
}

export type TableForRowId<Id extends SomeRowId> = Id extends RowId<infer Class>
  ? Table<Class>
  : never;

export class Table<D extends SomeModelClass> {
  #definition: D;
  #name: string;

  #rowsByLocalId: Map<string, Record<D>> = new TrackedMap();
  #rowsByRemoteId: Map<string, Record<D>> = new TrackedMap();

  constructor(model: D, private store: Store) {
    this.#definition = model;
    this.#name = model.name;
  }

  get name(): string {
    return this.#name;
  }

  lazyRemote(remoteId: string): LazyRowId<D> {
    let id = LazyRowId.remote(this.#definition, remoteId, this.store);
    let record = new Record(id, null);
    this.#rowsByLocalId.set(id.localId, record);
    this.#rowsByRemoteId.set(remoteId, record);
    return id;
  }

  lazyLocal(): LazyRowId<D> {
    let id = LazyRowId.local(this.#definition, this.store);
    let record = new Record(id, null);
    this.#rowsByLocalId.set(id.localId, record);
    return id;
  }

  initializeRemote(rowId: RowId<D>, data: ArgsForModelClass<D>): RowId<D> {
    if (this.#rowsByLocalId.get(rowId.localId)) {
      if (rowId.isLazy) {
        throw new Error(
          `assert: can only initialize a remote row when the row isn't already in the table; found a lazy record (did you mean 'fillLazy')`
        );
      } else {
        throw new Error(
          `assert: can only initialize a remote row when the row isn't already in the table (did you mean 'updatePresent')`
        );
      }
    }

    let record = new Record(rowId, data);
    this.#rowsByLocalId.set(rowId.localId, record);
    return rowId;
  }

  initializeLocal(
    id: RowId<D>,
    data: ArgsForModelClass<D>,
    meta: InstanceType<D>[META]
  ): void {
    let record = this.#rowsByLocalId.get(id.localId);

    if (record) {
      throw new Error(
        `assert: can only call Table#created to add a row to a table for the first time`
      );
    }

    record = new Record(id, data);
    id.updateMeta(meta);
    this.#rowsByLocalId.set(id.localId, record);
  }

  updatePresent(id: RowId<D>, data: ArgsForModelClass<D>): void {
    let record = this.#rowsByLocalId.get(id.localId);

    if (record === undefined) {
      throw new Error(`assert: can only update a row that's in the table`);
    }

    if (record.data === null) {
      throw new Error(
        `assert: can only update a row that has initialized data`
      );
    }

    record.updateData(data);
  }

  updateMeta(id: RowId<D>, meta: InstanceType<D>[META]): void {
    let record = this.#rowsByLocalId.get(id.localId);

    if (record === undefined) {
      throw new Error(`assert: can only update a row that's in the table`);
    }

    record.id.updateMeta(meta);
  }

  fillLazy(
    id: RowId<D>,
    row: InstanceType<D>,
    data: ArgsForModelClass<D>,
    meta: InstanceType<D>[META]
  ): void {
    let record = this.#rowsByLocalId.get(id.localId);

    if (record === undefined) {
      throw new Error(
        `assert: can only fill a lazy row that's in the table (you might want 'initializeLocal', 'initializeRemote', 'lazyLocal' or 'lazyRemote')`
      );
    }

    record.updateMeta(meta);
    record.updateData(data);
  }

  get(rowId: RowId<D>): Record<D> | null {
    return this.#rowsByLocalId.get(rowId.localId) || null;
  }
}
