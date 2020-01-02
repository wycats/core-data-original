import Route from "@ember/routing/route";
import { Entity } from "core-data/table";
import { SpacexDb } from "../services/spacex";
export default class IndexRoute extends Route {
    db: SpacexDb;
    model(): import("../../../../addon/selection").MultipleSelection<import("../services/spacex").SpacexSchema, "mission">;
    serialize(entity: Entity<"question">): {
        id: import("../../../../addon/table").IdValue;
    };
}
