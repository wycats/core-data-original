import Component from "@glimmer/component";
import { Entity } from "core-data/table";
import { use, QandaDb } from "dummy/services/db";

export default class extends Component {
  @use db!: QandaDb;

  declare args: { question: Entity<"question"> };

  get votes() {
    // a modelling facility makes sense, but this is the longhand
    let { upvotes, downvotes } = this.db
      .find(this.args.question)
      .select("upvotes", "downvotes");

    return upvotes - downvotes;
  }

  get answers() {
    // a hasMany facility makes sense, this is the longhand
    return this.db
      .all("answer")
      .where({ question: this.args.question })
      .count();
  }
}
