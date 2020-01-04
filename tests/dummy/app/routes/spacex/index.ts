import Route from "@ember/routing/route";
import { use } from "dummy/services/db";
import { SpacexDb } from "../../services/spacex";

export default class IndexRoute extends Route {
  @use spacex!: SpacexDb;

  model() {
    return this.spacex.all("launch");
  }
}
