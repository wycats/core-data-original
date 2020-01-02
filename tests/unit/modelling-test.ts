import { module, test } from "qunit";
import Database from "core-data/database";
import { schema } from "core-data/schema";
import faker from "faker";
import { QandaDb, QandaSchema } from "dummy/services/db";

module("modelling");

test("select", assert => {
  let db = populate();

  let question = db.first("question");

  let { upvotes, downvotes } = question.select("upvotes", "downvotes") as {
    upvotes: number;
    downvotes: number;
  };

  assert.ok(typeof upvotes === "number", "upvotes is a number");
  assert.ok(typeof downvotes === "number", "downvotes is a number");
});

test("relationships", assert => {
  let db = populate();

  let question = db.first("question");

  let count = db
    .all("answer")
    .where({ question })
    .count();

  assert.equal(typeof count, "number", "count is a number");

  let questions = db.all("question");
  let counts = [];

  for (let question of questions) {
    let count = db
      .all("answer")
      .where({ question })
      .count();
    counts.push(count);
  }

  assert.ok(
    counts.some(count => count > 0),
    "Some of the questions have answers"
  );
});

const DB = Database.create<QandaSchema>();

DB.define("question", {
  id: schema.id(),
  title: "string",
  body: "string",
  by: schema.one("user"),
  selectedAnswer: schema.optional(schema.one("answer")),
  upvotes: "number",
  downvotes: "number",
  rank: "number"
});

DB.define("answer", {
  id: schema.id(),
  by: schema.one("user"),
  question: schema.one("question"),
  upvotes: "number",
  downvotes: "number"
});

DB.define("user", {
  id: schema.id(),
  username: "string"
});

function populate(): QandaDb {
  let db = DB.empty();

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
      question: () => faker.random.arrayElement(questions),
      upvotes: () => faker.random.number({ min: 0, max: 1000 }),
      downvotes: () => faker.random.number({ min: 0, max: 1000 })
    },
    1000
  );

  return db;
}

// test("basic", assert => {
//   let db = setup();
// });

// function setup() {
//   let db = new Database();

//   let cars = DB.define(
//     new Sheet("cars", {
//       id: "id",
//       make: "scalar",
//       model: "scalar"
//     })
//   );

//   let customers = DB.define(
//     new Sheet("customers", {
//       id: "id",
//       name: "scalar"
//     })
//   );

//   let offers = DB.define(
//     new Sheet("offers", {
//       buyer: "reference",
//       seller: "reference",
//       item: "reference",
//       amount: "scalar"
//     })
//   );

//   let pzuraq = customers.insert({
//     id: "1",
//     name: "Chris Garrett"
//   });

//   let wycats = customers.insert({
//     id: "2",
//     name: "Yehuda Katz"
//   });

//   let leah = customers.insert({
//     id: "3",
//     name: "Leah Silber"
//   });

//   let pinto = cars.insert({
//     id: "1",
//     make: "Ford",
//     model: "Pinto"
//   });

//   offers.insert({
//     id: "1",
//     buyer: wycats,
//     seller: pzuraq,
//     item: pinto,
//     amount: 500
//   });

//   offers.insert({
//     id: "2",
//     buyer: leah,
//     seller: pzuraq,
//     item: pinto,
//     amount: 750
//   });

//   return db;
// }
