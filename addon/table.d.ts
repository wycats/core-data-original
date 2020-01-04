import Schema from "./schema";
import { SingleSelection, Query } from "./selection";
import PrimaryKeyMap from "./primary-key-map";
import { Types } from "./database";
export declare type SpecifiedDataType<T extends Types, N extends keyof T & string> = string | number | boolean | PrimaryKey | Entity<N> | SingleSelection<T, N>;
export declare type IdValue = string | number | boolean;
export declare type DataValue<T extends Types> = string | number | boolean | null | PrimaryKey | Entity<keyof T & string>;
export declare function isDataMatch<T extends Types>(left: DataValue<T>, right: DataValue<T>): boolean;
export declare function isIdMatch(left: PrimaryKey, right: PrimaryKey): boolean;
export declare function isEntity<T extends Types, N extends keyof T & string>(data: DataValue<T>): data is Entity<N>;
export declare function normalizeDataType<T extends Types, N extends keyof T & string>(data: SpecifiedDataType<T, N>): DataValue<T>;
export declare class InternalRow<T extends Types, N extends keyof T & string> {
    readonly entity: Entity<N>;
    private columnNames;
    static create<T extends Types, N extends keyof T & string>(entity: Entity<N>, row: {
        [key: string]: SpecifiedDataType<T, N>;
    }): InternalRow<T, N>;
    columns: Array<DataValue<T>>;
    constructor(entity: Entity<N>, columnNames: string[], columns: Array<DataValue<T>>);
    get id(): PrimaryKey;
    update(updates: {
        [key: string]: DataValue<T>;
    }): void;
    select<K extends keyof T[N] & string>(columns: readonly K[]): {
        [P in K]: T[N][K];
    };
    private getColumn;
    private columnIndex;
    isMatch(query: Query<T, N>): boolean;
}
export declare type PrimaryKey = IdValue[];
export interface Entity<T extends string> {
    table: T;
    id: PrimaryKey;
}
export declare type SpecifiedRow<T extends Types, N extends keyof T & string> = {
    id: PrimaryKey | string;
} & {
    [key: string]: SpecifiedDataType<T, N>;
};
export declare const EMPTY: unique symbol;
export declare const FILTER: unique symbol;
export declare const ADD_ROW: unique symbol;
export declare const SCHEMA: unique symbol;
export interface Type<T extends Types> {
    [key: string]: DataValue<T>;
}
export declare type SpecifiedQuery<T extends Types, K extends keyof T> = {
    [P in keyof T[K]]?: T[K][P];
};
export default class Table<T extends Types, N extends keyof T & string> {
    readonly name: N;
    private schema;
    map: PrimaryKeyMap<InternalRow<T, N>>;
    constructor(name: N, schema: Schema);
    get [SCHEMA](): Schema;
    [EMPTY](): Table<T, N>;
    [FILTER](query: Query<T, N>): ReadonlyArray<Entity<N>>;
    [ADD_ROW](row: InternalRow<T, N>): Entity<N>;
    all(): ReadonlyArray<Entity<N>>;
    first(): Entity<N>;
    get(id: PrimaryKey): InternalRow<T, N>;
    add(row: SpecifiedRow<T, N>): InternalRow<T, N>;
    replace(id: PrimaryKey, newRow: SpecifiedRow<T, N>): void;
}
