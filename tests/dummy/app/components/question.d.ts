import Component from "@glimmer/component";
import { QandaDb } from "dummy/services/db";
import { Entity } from "core-data/table";
export default class extends Component {
    db: QandaDb;
    args: {
        question: Entity<"question">;
    };
    vote(direction: "up" | "down"): void;
    generateAnswer(): void;
    get answers(): Entity<"answer">[];
    get votes(): number;
    get answerCount(): number;
}
