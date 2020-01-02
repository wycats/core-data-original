import Route from "@ember/routing/route";
import { use } from "dummy/services/db";
import { Entity } from "core-data/table";
import { SpacexDb } from "../services/spacex";

export default class IndexRoute extends Route {
  @use db!: SpacexDb;

  model() {
    return this.db.all("mission");
  }

  serialize(entity: Entity<"question">) {
    return { id: entity.id[0] };
  }
}
