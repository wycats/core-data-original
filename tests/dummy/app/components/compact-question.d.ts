import Component from "@glimmer/component";
import { Entity } from "core-data/table";
import { QandaDb } from "dummy/services/db";
export default class extends Component {
    db: QandaDb;
    args: {
        question: Entity<"question">;
    };
    get votes(): number;
    get answers(): number;
}
