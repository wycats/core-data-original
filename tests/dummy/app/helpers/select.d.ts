import Helper from "@ember/component/helper";
import Database from "core-data/database";
import { Entity } from "core-data/table";
export default class Select extends Helper {
    db: Database<any>;
    compute([column]: [string], { from }: {
        from: Entity<string>;
    }): any;
}
