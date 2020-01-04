import Component from "@glimmer/component";
import { QandaDb } from "dummy/services/db";
import { Entity } from "core-data/table";
export default class extends Component {
    db: QandaDb;
    args: {
        model: Entity<"question">;
    };
    vote(direction: "up" | "down"): void;
    get votes(): number;
}
