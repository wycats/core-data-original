import Route from "@ember/routing/route";
import { SpacexDb } from "../services/spacex";
export default class IndexRoute extends Route {
    db: SpacexDb;
    model(): import("../../../../addon/selection").MultipleSelection<import("../services/spacex").SpacexSchema, "mission">;
}
