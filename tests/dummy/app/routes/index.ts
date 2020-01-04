import Route from "@ember/routing/route";
import { use } from "dummy/services/db";
import { SpacexDb } from "../services/spacex";

export default class IndexRoute extends Route {
  @use db!: SpacexDb;

  model() {
    return this.db.all("mission");
  }
}
