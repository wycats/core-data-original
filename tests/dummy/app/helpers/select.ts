import Helper from "@ember/component/helper";
import Database from "core-data/database";
import { Entity } from "core-data/table";
import { use } from "dummy/services/db";

export default class Select extends Helper {
  @use db!: Database<any>;

  compute([column]: [string], { from }: { from: Entity<string> }) {
    return this.db.find(from).select(column)[column];
  }
}
