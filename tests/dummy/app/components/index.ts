import Component from "@glimmer/component";
import { use, QandaDb } from "../services/db";

export default class Index extends Component {
  @use db!: QandaDb;

  get questions() {
    return this.db.all("question");
  }
}
