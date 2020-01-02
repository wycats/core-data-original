import Component from "@glimmer/component";
import { use, QandaDb } from "dummy/services/db";
import { Entity } from "core-data/table";

export default class extends Component {
  @use db!: QandaDb;

  declare args: { model: Entity<"question"> };

  get votes() {
    // a modelling facility makes sense, but this is the longhand
    let { upvotes, downvotes } = this.db
      .find(this.args.model)
      .select("upvotes", "downvotes");

    return upvotes - downvotes;
  }
}
