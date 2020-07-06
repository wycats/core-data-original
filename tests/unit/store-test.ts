import { createStore, Model, ModelSchema, Store, table } from "ember-state";
import { module, QUnitAssert, test } from "../utils";

interface MaterialSchema {
  name: string;
  source: string | null;
  activities: typeof ActivityTable[];
}

class Material extends Model<MaterialSchema> {}
const MaterialTable = table(Material);
type MaterialTable = typeof MaterialTable;

interface ActivitySchema extends ModelSchema {
  name: string;
  category: string | null;
  materials: MaterialTable[];
  days: DayTable[];
}

class Activity extends Model<ActivitySchema> {}
const ActivityTable = table(Activity);
type ActivityTable = typeof ActivityTable;

interface DayData extends ModelSchema {
  date: string;
  activities: ActivityTable[];
}

class Day extends Model<DayData> {}
const DayTable = table(Day);
type DayTable = typeof DayTable;

function setup(): Store {
  let store = createStore();
  store.createTable(MaterialTable);
  store.createTable(ActivityTable);
  store.createTable(DayTable);

  return store;
}

@module("creating a database")
export class DatabaseTest {
  assert!: QUnitAssert;

  #store = setup();

  @test record() {
    let store = this.#store;

    let soapId = store.create(MaterialTable, {
      name: "Soap",
      source: null,
      activities: [],
    });

    let soap = store.deref(soapId);

    this.assert.equal(soap.name, "Soap");
    this.assert.equal(soap.source, null);
  }

  @test relationship() {
    let bubbles = this.#store.lazyLocal(ActivityTable);

    let soapId = this.#store.create(MaterialTable, {
      name: "Soap",
      source: null,
      activities: [bubbles],
    });

    this.#store.create(
      ActivityTable,
      {
        name: "Bubbles",
        category: null,
        materials: [soapId],
        days: [],
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

  @test remoteRelationship() {
    let bubbles = this.#store.lazy(ActivityTable, "1");

    let soapId = this.#store.create(MaterialTable, {
      name: "Soap",
      source: null,
      activities: [bubbles],
    });

    this.#store.load(
      ActivityTable,
      {
        name: "Bubbles",
        category: null,
        materials: [soapId],
        days: [],
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
