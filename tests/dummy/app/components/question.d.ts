import Component from "@glimmer/component";
import { QandaDb } from "dummy/services/db";
import { Entity } from "core-data/table";
export default class extends Component {
    db: QandaDb;
    args: {
        question: Entity<"question">;
    };
    upvote(): void;
    downvote(): void;
    get votes(): number;
    get answers(): import("../../../../addon/selection").MultipleSelection<import("../services/db").QandaSchema, "answer">;
    get answerCount(): number;
}
