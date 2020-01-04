import { PrimaryKey, IdValue } from "./table";
import { TrackedMap } from "tracked-built-ins";

type PrivateMap<T> = Map<IdValue, T | PrivateMap<T>>;

export default class PrimaryKeyMap<T> {
  private map: PrivateMap<T> = new TrackedMap();

  private entry(
    key: PrimaryKey
  ): { map: Map<IdValue, T>; key: IdValue } | undefined {
    if (key.length === 1) {
      return { map: this.map, key: key[0] } as any;
    }

    let current: PrivateMap<T> = this.map;
    let head = key.slice(0, -1);
    let tail = key.slice(-1)[0];

    for (let part of head) {
      if (current.has(part)) {
        let next = current.get(part);

        if (next instanceof TrackedMap) {
          current = next;
        } else {
          // we're looking for something like `(foo, bar)` but the composite
          // key for this table is more than two long
          return;
        }
      } else {
        current = new TrackedMap();
      }
    }

    let next = current.get(tail);

    if (next instanceof TrackedMap) {
      return;
    } else {
      return { map: current, key: tail } as any;
    }
  }

  get(key: PrimaryKey): T | undefined {
    let entry = this.entry(key);

    if (entry === undefined) {
      return undefined;
    } else {
      return entry.map.get(entry.key);
    }
  }

  set(key: PrimaryKey, value: T): void {
    let entry = this.entry(key);

    if (entry === undefined) {
      return;
    } else {
      entry.map.set(entry.key, value);
    }
  }

  keys(): Iterable<IdValue[]> {
    return keys(this.map);
  }

  values(): Iterable<T> {
    return values(this.map);
  }
}

function keys(map: PrivateMap<unknown>, stack: IdValue[] = []): PrimaryKey[] {
  let out = [];

  for (let [key, value] of map.entries()) {
    if (value instanceof TrackedMap) {
      out.push(...keys(value, [...stack, key]));
    } else {
      out.push([...stack, key]);
    }
  }

  return out;
}

function values<T>(map: PrivateMap<T>): T[] {
  let out = [];

  for (let value of map.values()) {
    if (value instanceof Map) {
      out.push(...values(value));
    } else {
      out.push(value);
    }
  }

  return out;
}
