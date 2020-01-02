import Component from "@glimmer/component";
import { use, QandaDb } from "dummy/services/db";
import { Entity } from "core-data/table";
import { action } from "@ember/object";

export default class extends Component {
  @use db!: QandaDb;

  declare args: { question: Entity<"question"> };

  @action
  upvote() {
    let { upvotes } = this.db.find(this.args.question).select("upvotes");

    this.db.update(this.args.question, { upvotes: upvotes + 1 });
  }

  @action
  downvote() {
    let { downvotes } = this.db.find(this.args.question).select("downvotes");

    this.db.update(this.args.question, { downvotes: downvotes + 1 });
  }

  get votes() {
    // a modelling facility makes sense, but this is the longhand
    let { upvotes, downvotes } = this.db
      .find(this.args.question)
      .select("upvotes", "downvotes");

    return upvotes - downvotes;
  }

  get answers() {
    return this.db.all("answer").where({ question: this.args.question });
  }

  get answerCount() {
    return this.db
      .all("answer")
      .where({ question: this.args.question })
      .count();
  }
}
