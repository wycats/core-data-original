import Route from "@ember/routing/route";
import { use, QandaDb } from "dummy/services/db";
import { Entity } from "core-data/table";

export default class QuestionRoute extends Route {
  @use db!: QandaDb;

  model({ id }: { id: string }): Entity<"question"> {
    return { table: "question", id: [id] };
  }

  serialize(entity: Entity<"question">) {
    return { id: entity.id[0] };
  }
}
