import Route from "@ember/routing/route";
import faker from "faker";
import { QandaDb, use } from "../services/db";
import { SpacexDb } from "../services/spacex";

export default class IndexRoute extends Route {
  @use db!: QandaDb;
  @use spacex!: SpacexDb;

  model() {
    this.populateQanda();
    this.populateSpacex();
  }

  private populateSpacex() {
    let db = this.spacex;

    let rockets = db.populate("rocket", {
      name: faker.commerce.productName,
      type: () => faker.fake("v{{system.semver}}")
    }, 10);

    let missions = db.populate("mission", {
      name: () => faker.fake("{{commerce.productAdjective}} {{commerce.productMaterial}} {{system.semver}}"),
    }, 100);

    db.populate("launch", {
      site: () => faker.fake("{{address.city}}, {{address.country}}"),
      mission: () => faker.random.arrayElement(missions),
      rocket: () => faker.random.arrayElement(rockets),
      isBooked: faker.random.boolean
    }, 300)
  }

  private populateQanda() {
    let db = this.db;

    let users = db.populate(
      "user",
      {
        username: faker.internet.userName
      },
      10
    );

    let questions = db.populate(
      "question",
      {
        title: faker.lorem.sentence,
        body: faker.lorem.paragraphs,
        selectedAnswer: faker.random.boolean,
        by: () => faker.random.arrayElement(users),
        rank: () => faker.random.number({ min: 0, max: 10 }),
        upvotes: () => faker.random.number({ min: 0, max: 1000 }),
        downvotes: () => faker.random.number({ min: 0, max: 1000 })
      },
      100
    );

    db.populate(
      "answer",
      {
        by: () => faker.random.arrayElement(users),
        body: faker.lorem.paragraphs,
        question: () => faker.random.arrayElement(questions),
        upvotes: () => faker.random.number({ min: 0, max: 1000 }),
        downvotes: () => faker.random.number({ min: 0, max: 1000 })
      },
      1000
    );
  }
}
