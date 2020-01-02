import Database, { FIND, Types } from "./database";
import {
  Entity,
  FILTER,
  InternalRow,
  normalizeDataType,
  PrimaryKey,
  SpecifiedQuery
} from "./table";

export const ENTITY = Symbol("ENTITY");
export const INTERNAL_ROW = Symbol("INTERNAL_ROW");

export class SingleSelection<T extends Types, N extends keyof T & string>
  implements Entity<N> {
  constructor(private db: Database<T>, private entity: Entity<N>) {}

  get table(): N {
    return this.entity.table;
  }

  get id(): PrimaryKey {
    return this.entity.id;
  }

  get [ENTITY]() {
    return this.entity;
  }

  get [INTERNAL_ROW](): InternalRow<T, N> {
    return this.db.get(this.entity.table).get(this.entity.id) as InternalRow<
      T,
      N
    >;
  }

  select<K extends keyof T[N] & string>(...fields: K[]): { [P in K]: T[N][K] } {
    let row = this.db[FIND](this.entity);

    return row.select(fields) as { [P in K]: T[N][K] };
  }
}

export type Query<T extends Types, N extends keyof T & string> = {
  [P in keyof T[N]]: T[N][P];
};

export class MultipleSelection<T extends Types, N extends keyof T & string>
  implements Iterable<Entity<N>> {
  constructor(
    private db: Database<T>,
    private table: N,
    private query: Query<T, N> | null = null
  ) {}

  *[Symbol.iterator]() {
    let table = this.db.get(this.table);
    let entities: ReadonlyArray<Entity<N>>;

    if (this.query === null) {
      entities = table.all();
    } else {
      entities = table[FILTER](this.query);
    }

    for (let entity of entities) {
      yield entity;
    }
  }

  where(query: SpecifiedQuery<T, N>): MultipleSelection<T, N> {
    let normalized = normalize(query);

    if (this.query === null) {
      return new MultipleSelection(this.db, this.table, normalized);
    } else {
      return new MultipleSelection(this.db, this.table, {
        ...this.query,
        ...normalized
      });
    }
  }

  count(): number {
    let count = 0;

    for (let _ of this) {
      count++;
    }

    return count;
  }
}

function normalize<T extends Types, N extends keyof T & string>(
  query: SpecifiedQuery<T, N>
): Query<T, N> {
  let out = Object.create(null);

  for (let key of Object.keys(query)) {
    out[key] = normalizeDataType((query as any)[key]);
  }

  return out;
}
