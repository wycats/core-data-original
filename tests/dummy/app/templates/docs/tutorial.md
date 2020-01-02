For this tutorial, we're going to build a simple Question and Answer app, sort of like a stripped down Stack Overflow.

# Data Modelling

When using Core Data, the most important thing to do first is to design the data model that you'll be working with.

> TODO: Diagram

```ts
const DB = new Database();

db.define("question", {
  id: "id",
  title: "string",
  body: "string",
  by: db.one("user"),
  selectedAnswer: schema.optional(db.one("answer")),
  upvotes: "number",
  downvotes: "number",
  rank: "number"
});

db.define("answer", {
  id: "id",
  by: db.one("user"),
  question: db.one("question"),
  upvotes: "number",
  downvotes: "number"
});

db.define("user", {
  id: "id",
  username: "string"
});
```

# Start the UI

Now that we made some tables, let's use them in a simple UI:

## Route

```ts
export default class Index extends Route {
  @service db;

  model() {
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
  }
}
```

## Index Component

```ts
export default class Index extends Component {
  @service db;
  @use questions = db.all("question");
}
```

```hbs
<h1>Top Questions</h1>

{{#each this.questions as |question|}}
  <CompactQuestion @question={{question}} />
{{/each}}
```

## Question Component

```hbs
<div class="votes">{{this.votes}}</div>
<div class="answers">{{this.answers}}</div>
<div class="title">{{select "title" from=@question}}</div>
```

```ts
export default class extends Component {
  @service db;

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
```

# The Question Page

## Router

```ts
export default routes([
  { path: "/", to: "index" },
  { path: "/question/:id", to: "question" }
]);
```

## Route

```ts
export default class extends Route {
  @service db;

  model(id) {
    return this.db.find({ table: "question", id: [id] });
  }
}
```

## Move Setup to Application

```ts
export class ApplicationRoute extends Route {
  @service db;

  model() {
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
  }
}
```

## The Question Component

```hbs
<h1>{{select "title" from=@question}}</h1>

<button class="up">👍</button>
<button class="down">👎</button>
<div class="count">{{this.votes}}</div>

<div class="body">{{select "body" from=@question}}</div>

<h2>{{count this.answers}} Answers</h2>

{{#each this.answers as |answer|}}
  <Answer @model={{answer}} />
{{/each}}
```

```ts
export default class extends Component {
  @service db;

  get votes() {
    return db.find(this.args.model);
  }

  get answers() {
    return db.find("answer").where({ question: this.args.question });
  }

  get answerCount() {
    return db
      .find("answer")
      .where({ question: this.args.question })
      .count();
  }
}
```

# Answer Component

```hbs
<button class="up">👍</button>
<button class="down">👎</button>
<div class="count">{{this.votes}}</div>

<div class="body">{{select "body" from=@question}}</div>
```

```ts
export default class extends Component {
  @service db;

  get votes() {
    // a modelling facility makes sense, but this is the longhand
    let { upvotes, downvotes } = this.db
      .find(this.args.question)
      .select("upvotes", "downvotes");

    return upvotes - downvotes;
  }
}
```

# TODO

```ts
db.define("question", {
  tags: schema.array(db.one("tag"))
});

db.define("tag", {
  id: "id",
  name: "string"
});
```

```ts
db.define("comment", {
  entity: schema.entity(),
  user: db.one("user"),
  body: "string"
});
```
