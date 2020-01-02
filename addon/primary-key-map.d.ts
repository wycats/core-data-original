import { PrimaryKey, IdValue } from "./table";
export default class PrimaryKeyMap<T> {
    private map;
    private entry;
    get(key: PrimaryKey): T | undefined;
    set(key: PrimaryKey, value: T): void;
    keys(): Iterable<IdValue[]>;
    values(): Iterable<T>;
}
