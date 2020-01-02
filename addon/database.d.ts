import Schema from "./schema";
import { MultipleSelection, SingleSelection } from "./selection";
import Table, { DataValue, Entity, InternalRow } from "./table";
interface FakeData {
    [key: string]: () => unknown;
}
export declare const FIND: unique symbol;
export interface Types {
}
export default class Database<T extends Types> {
    static create<T extends Types>(): Database<T>;
    readonly tables: Map<keyof T, Table<T, keyof T & string>>;
    private constructor();
    define<N extends keyof T & string>(name: N, schema: Schema): void;
    empty(): Database<T>;
    [FIND]<N extends keyof T & string>(entity: Entity<N>): InternalRow<T, N>;
    first<N extends keyof T & string>(name: N): SingleSelection<T, N>;
    all<N extends keyof T & string>(name: N & keyof T): MultipleSelection<T, N>;
    find<N extends keyof T & string>(name: N, id: string): SingleSelection<T, N>;
    find<N extends keyof T & string>(entity: Entity<N>): SingleSelection<T, N>;
    get<N extends keyof T & string>(name: N): Table<T, N>;
    update<N extends keyof T & string>(entity: Entity<N>, updates: {
        [key: string]: DataValue<T>;
    }): void;
    populate<N extends keyof T & string>(name: N, data: FakeData, amount: number): Entity<N>[];
}
export {};
