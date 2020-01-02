import Component from "@glimmer/component";
import { QandaDb } from "../services/db";
export default class Index extends Component {
    db: QandaDb;
    get questions(): import("../../../../addon/selection").MultipleSelection<import("../services/db").QandaSchema, "question">;
}
