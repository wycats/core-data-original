import {
  createStore,
  META,
  Model,
  Store,
  SchemaForModelClass,
  ModelData,
  ModelSchema,
  ModelArgs,
  ModelConstructor,
} from "ember-state";
import { module, QUnitAssert, test } from "../utils";

interface ModelMeta {
  status: "lazy" | "loading" | "loaded" | "local";
}

interface MaterialSchema extends ModelData {
  name: string;
  source: string | null;
  activities: Activity[];
  [META]: ModelMeta;
}

class Material extends Model<MaterialSchema> {}

interface ActivitySchema extends ModelData {
  name: string;
  category: string | null;
  materials: Material[];
  days: Day[];
  [META]?: ModelMeta;
}

class Activity extends Model<ActivitySchema> {}

let q: Activity = null as any;
type Q = ModelArgs<SchemaForModelClass<typeof Activity>>;
type R = typeof q extends ModelConstructor<infer Schema> ? Schema : never;

interface DayData extends ModelData {
  date: string;
  activities: Activity[];
  [META]?: ModelMeta;
}

class Day extends Model<DayData> {}

function setup(): Store {
  let store = createStore();
  store.createTable(Material);
  store.createTable(Activity);
  store.createTable(Day);

  return store;
}

@module("creating a database")
export class DatabaseTest {
  assert!: QUnitAssert;

  #store = setup();

  @test record() {
    let store = this.#store;

    let soapId = store.create(Material, {
      name: "Soap",
      source: null,
      activities: [],
      [META]: { status: "local" },
    });

    let soap = store.deref(soapId);

    this.assert.equal(soap.name, "Soap");
    this.assert.equal(soap.source, null);
  }

  @test relationship() {
    let bubbles = this.#store.lazyLocal(Activity);

    let soapId = this.#store.create(Material, {
      name: "Soap",
      source: null,
      activities: [bubbles],
      [META]: { status: "local" },
    });

    this.#store.create(
      Activity,
      {
        name: "Bubbles",
        category: null,
        materials: [soapId],
        days: [],
        [META]: { status: "local" },
      },
      bubbles
    );

    let soap = this.#store.deref(soapId);
    this.assert.equal(soap.name, "Soap", "name=Soap");
    this.assert.equal(soap.source, null, "source=null");
    this.assert.deepEqual(soap[META], { status: "local" });
    this.assert.deepEqual(
      soap.activities,
      [this.#store.deref(bubbles)],
      "activities=[bubbles]"
    );
    this.assert.deepEqual(
      soap.activities.map((a) => a.name),
      ["Bubbles"],
      "activities.name=['Bubbles']"
    );
    this.assert.deepEqual(
      soap.activities.map((a) => a[META]),
      [{ status: "local" }],
      "activities.name=['Bubbles']"
    );
  }

  @test remoteRelationship() {
    let bubbles = this.#store.lazy(Activity, "1");

    let soapId = this.#store.create(Material, {
      name: "Soap",
      source: null,
      activities: [bubbles],
      [META]: { status: "local" },
    });

    this.#store.load(
      Activity,
      {
        name: "Bubbles",
        category: null,
        materials: [soapId],
        days: [],
        [META]: { status: "loaded" },
      },
      bubbles
    );

    let soap = this.#store.deref(soapId);
    this.assert.equal(soap.name, "Soap", "name=Soap");
    this.assert.equal(soap.source, null, "source=null");
    this.assert.deepEqual(
      soap.activities,
      [this.#store.deref(bubbles)],
      "activities=[bubbles]"
    );
    this.assert.deepEqual(
      soap.activities.map((a) => a.name),
      ["Bubbles"],
      "activities.name=['Bubbles']"
    );
  }
}
