import Database, { Types } from "./database";
import { Entity, InternalRow, PrimaryKey, SpecifiedQuery } from "./table";
export declare const ENTITY: unique symbol;
export declare const INTERNAL_ROW: unique symbol;
export declare class SingleSelection<T extends Types, N extends keyof T & string> implements Entity<N> {
    private db;
    private entity;
    constructor(db: Database<T>, entity: Entity<N>);
    get table(): N;
    get id(): PrimaryKey;
    get [ENTITY](): Entity<N>;
    get [INTERNAL_ROW](): InternalRow<T, N>;
    select<K extends keyof T[N] & string>(...fields: K[]): {
        [P in K]: T[N][K];
    };
}
export declare type Query<T extends Types, N extends keyof T & string> = {
    [P in keyof T[N]]: T[N][P];
};
export declare class MultipleSelection<T extends Types, N extends keyof T & string> implements Iterable<Entity<N>> {
    private db;
    private table;
    private query;
    constructor(db: Database<T>, table: N, query?: Query<T, N> | null);
    [Symbol.iterator](): Generator<Entity<N>, void, unknown>;
    where(query: SpecifiedQuery<T, N>): MultipleSelection<T, N>;
    count(): number;
}
