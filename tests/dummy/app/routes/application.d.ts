import Route from "@ember/routing/route";
import { QandaDb } from "../services/db";
import { SpacexDb } from "../services/spacex";
export default class IndexRoute extends Route {
    db: QandaDb;
    spacex: SpacexDb;
    model(): void;
    private populateSpacex;
    private populateQanda;
}
