import Helper from "@ember/component/helper";
import { MultipleSelection } from "core-data/selection";
import { QandaDb } from "../services/db";
export default class Count extends Helper {
    db: QandaDb;
    compute([selection]: [MultipleSelection<{
        [key: string]: unknown;
    }, string>]): number;
}
