import Component from "@glimmer/component";
import { use, QandaDb } from "dummy/services/db";
import { Entity } from "core-data/table";
import { action } from "@ember/object";

export default class extends Component {
  @use db!: QandaDb;

  declare args: { model: Entity<"question"> };

  @action
  vote(direction: "up" | "down") {
    let answer = this.args.model;

    switch (direction) {
      case "up":
        let { upvotes } = this.db.find(answer).select("upvotes");
        this.db.update(answer, { upvotes: upvotes + 1 });
        return;

      case "down":
        let { downvotes } = this.db.find(answer).select("downvotes");
        this.db.update(answer, { downvotes: downvotes + 1 });
        return;
    }
  }

  get votes() {
    // a modelling facility makes sense, but this is the longhand
    let { upvotes, downvotes } = this.db
      .find(this.args.model)
      .select("upvotes", "downvotes");

    return upvotes - downvotes;
  }
}
