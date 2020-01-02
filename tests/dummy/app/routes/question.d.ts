import Route from "@ember/routing/route";
import { QandaDb } from "dummy/services/db";
import { Entity } from "core-data/table";
export default class QuestionRoute extends Route {
    db: QandaDb;
    model({ id }: {
        id: string;
    }): Entity<"question">;
    serialize(entity: Entity<"question">): {
        id: import("../../../../addon/table").IdValue;
    };
}
