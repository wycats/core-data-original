import Service from "@ember/service";
import Database, { Types } from "core-data/database";
import { schema } from "core-data/schema";
import { getOwner } from "@ember/application";
import { Type, Entity } from "core-data/table";

export interface Question extends Type<QandaSchema> {
  title: string;
  body: string;
  by: Entity<"user">;
  selectedAnswer: Entity<"answer"> | null;
  upvotes: number;
  downvotes: number;
  rank: number;
}

export interface Answer extends Type<QandaSchema> {
  user: Entity<"user">;
  question: Entity<"question">;
  body: string;
  upvotes: number;
  downvotes: number;
}

export interface User extends Type<QandaSchema> {
  username: string;
}

export interface QandaSchema extends Types {
  question: Question;
  answer: Answer;
  user: User;
}

export type QandaDb = Database<QandaSchema>;

export default class DbService extends Service {
  readonly state = Database.create<QandaSchema>();

  constructor(owner: object) {
    super(owner);

    let db = this.state;

    db.define("question", {
      id: schema.id(),
      title: "string",
      body: "string",
      by: schema.one("user"),
      selectedAnswer: schema.optional(schema.one("answer")),
      upvotes: "number",
      downvotes: "number",
      rank: "number"
    });

    db.define("answer", {
      id: schema.id(),
      by: schema.one("user"),
      question: schema.one("question"),
      body: "string",
      upvotes: "number",
      downvotes: "number"
    });

    db.define("user", {
      id: schema.id(),
      username: "string"
    });
  }
}

export const use = (target: any, name: string) => {
  Object.defineProperty(target, name, {
    enumerable: true,
    configurable: true,
    get() {
      let owner = getOwner(this);
      let service = owner.lookup(`service:${name}`);
      return service.state;
    }
  });
};
