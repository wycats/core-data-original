import Helper from "@ember/component/helper";
import Database from "core-data/database";
import { Entity } from "core-data/table";
export default class Select extends Helper {
    db: Database<any>;
    compute([...columns]: [string], { from, db }: {
        from: Entity<string>;
        db?: Database<any>;
    }): any;
}
