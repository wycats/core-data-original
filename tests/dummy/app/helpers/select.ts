import Helper from "@ember/component/helper";
import Database from "core-data/database";
import { Entity } from "core-data/table";
import { use } from "dummy/services/db";

export default class Select extends Helper {
  @use db!: Database<any>;

  compute([...columns]: [string], { from, db = this.db }: { from: Entity<string>, db?: Database<any> }) {
    if (columns.length === 1) {
      return compute(columns[0], from, db);
    } else {
      let out = Object.create(null);

      for (let column of columns) {
        compute(column, from, db, out);
      }

      return out;
    }
  }
}

function compute(column: string, from: Entity<string>, db: Database<any>, out?: { [key: string]: unknown }) {
  if (column.includes(".")) {
    computePath(column.split("."), from, db, out);
  } else if (out) {
    out[column] = db.find(from).select(column)[column];
  } else {
    return db.find(from).select(column)[column];
  }
}

function computePath(parts: string[], from: Entity<string>, db: Database<any>, out = Object.create(null)) {
  if (parts.length === 1) {
    let part = parts[0];

    out[part] = compute(part, from, db);
  } else {
    let [head, ...tail] = parts;

    if (out[head] === undefined) {
      out[head] = Object.create(null)
    }

    let nextEntity = db.find(from).select(head)[head];

    computePath(tail, nextEntity, db, out[head]);
  }

  return out;
}
