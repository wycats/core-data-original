import Component from "@glimmer/component";
import { use, QandaDb } from "dummy/services/db";
import { Entity } from "core-data/table";
import { action } from "@ember/object";
import faker from "faker";

export default class extends Component {
  @use db!: QandaDb;

  declare args: { question: Entity<"question"> };

  @action
  vote(direction: "up" | "down") {
    let question = this.args.question;

    switch (direction) {
      case "up":
        let { upvotes } = this.db.find(question).select("upvotes");
        this.db.update(question, { upvotes: upvotes + 1 });
        return;

      case "down":
        let { downvotes } = this.db.find(question).select("downvotes");
        this.db.update(question, { downvotes: downvotes + 1 });
        return;
    }
  }

  @action
  generateAnswer() {
    let users = this.db.all("user");

    this.db.add("answer", {
      id: this.db.nextId(),
      by: faker.random.arrayElement([...users]),
      body: faker.lorem.paragraphs(),
      question: this.args.question,
      upvotes: 0,
      downvotes: 0
    });
  }

  get answers() {
    return [...this.db.all("answer").where({ question: this.args.question })];
  }

  get votes() {
    // a modelling facility makes sense, but this is the longhand
    let { upvotes, downvotes } = this.db
      .find(this.args.question)
      .select("upvotes", "downvotes");

    return upvotes - downvotes;
  }

  get answerCount() {
    return this.db
      .all("answer")
      .where({ question: this.args.question })
      .count();
  }
}
