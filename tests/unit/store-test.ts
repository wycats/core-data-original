import {
  createStore,
  META,
  Model,
  ModelData,
  Store,
  ID,
  SomeModel,
  ModelConstructor,
} from "ember-state";
import { module, QUnitAssert, test } from "../utils";
import {
  createCache,
  getValue,
  isConst,
} from "@glimmer/tracking/primitives/cache";
import { stability, Stability } from "./stability";

interface ModelMeta {
  status: "lazy" | "loading" | "loaded" | "local" | "updating";
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

interface DaySchema extends ModelData {
  date: string;
  activities: Activity[];
  [META]?: ModelMeta;
}

class Day extends Model<DaySchema> {}

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

  @test "record stability"() {
    let store = this.#store;

    let soapId = store.create(Material, {
      name: "Soap",
      source: null,
      activities: [],
      [META]: { status: "local" },
    });

    let check = this.stability(
      ({ name, source }) => {
        let soap = store.deref(soapId);

        this.assert.equal(soap.name, name, `soap.name=${name}`);
        this.assert.equal(soap.source, source, `soap.source=${source}`);
      },
      { name: "Soap", source: null as string | null },
      "deref and access properties"
    );

    check.assertStable();

    store.updatePresent(soapId, {
      name: "Soap!",
      source: null,
      activities: [],
      [META]: { status: "local" },
    });

    check.assertStale({ name: "Soap!", source: null });

    store.updatePresent(soapId, {
      name: "Soap!",
      source: "Costco",
      activities: [],
      [META]: { status: "local" },
    });

    check.assertStale({ name: "Soap!", source: "Costco" });

    store.updatePresent(soapId, {
      name: "Soap",
      source: null,
      activities: [],
      [META]: { status: "local" },
    });

    check.assertStale({ name: "Soap", source: null });
  }

  @test "relationship stability"() {
    // TODO: Transition lazy -> present id
    let bubbles = this.#store.lazyLocal(Activity);

    let soapId = this.#store.create(Material, {
      name: "Soap",
      source: null,
      activities: [bubbles],
      [META]: { status: "local" },
    });

    this.#store.fillLazy(
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

    let check = this.stability(
      ({ name, source, meta, activities, activityNames, activityMeta }) => {
        let soap = this.#store.deref(soapId);

        this.assert.equal(soap.name, name, `soap.name=${name}`);
        this.assert.equal(soap.source, source, `soap.source=${source}`);
        this.assert.deepEqual(soap[META], meta, "meta");
        this.equalArrays(
          soap.activities,
          activities,
          `activities=[${activities.map((a) => a[ID].localId).join(",")}]`
        );
        this.equalArrays(
          soap.activities.map((a) => a.name),
          activityNames,
          `activities.name=[${activityNames.join(", ")}]`
        );
        this.equalArrays(
          soap.activities.map((a) => a[META] as ModelMeta),
          activityMeta,
          `activities.meta=[${JSON.stringify(activityMeta)}]`
        );
      },
      {
        name: "Soap",
        source: null as string | null,
        meta: { status: "local" },
        activities: [this.#store.deref(bubbles)],
        activityNames: ["Bubbles"],
        activityMeta: [{ status: "local" }] as ModelMeta[],
      },
      "deref and access properties"
    );

    check.assertStable();

    this.#store.updatePresent(bubbles, {
      name: "Bubbles!",
      category: null,
      materials: [soapId],
      days: [],
      [META]: { status: "local" },
    });

    check.assertStale({
      name: "Soap",
      source: null as string | null,
      meta: { status: "local" },
      activities: [this.#store.deref(bubbles)],
      activityNames: ["Bubbles!"],
      activityMeta: [{ status: "local" }] as ModelMeta[],
    });

    this.#store.updatePresent(soapId, {
      name: "Soap!",
      source: null,
      activities: [bubbles],
      [META]: { status: "local" },
    });

    check.assertStale({
      name: "Soap!",
      source: null as string | null,
      meta: { status: "local" },
      activities: [this.#store.deref(bubbles)],
      activityNames: ["Bubbles!"],
      activityMeta: [{ status: "local" }] as ModelMeta[],
    });
  }

  @test
  "updating meta doesn't invalidate data access, but it does invalidate meta access"() {
    let store = this.#store;

    let soapId = store.create(Material, {
      name: "Soap",
      source: null,
      activities: [],
      [META]: { status: "local" },
    });

    let soap = store.deref(soapId);
    let dataCheck = this.stability(
      ({ name, source }) => {
        this.assert.equal(soap.name, name);
        this.assert.equal(soap.source, source);
      },
      { name: "Soap", source: null as string | null, status: "local" },
      "data check"
    );

    let metaCheck = this.stability(
      (status) => {
        this.assert.deepEqual(
          soap[META],
          { status },
          `meta={ status: ${status} }`
        );
      },
      "local",
      "meta check"
    );

    store.updateMeta(soapId, { status: "updating" });

    dataCheck.assertStable();
    metaCheck.assertStale("updating");
  }

  @test relationship() {
    let bubbles = this.#store.lazyLocal(Activity);

    let soapId = this.#store.create(Material, {
      name: "Soap",
      source: null,
      activities: [bubbles],
      [META]: { status: "local" },
    });

    this.#store.fillLazy(
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
    this.equalArrays(
      soap.activities,
      [this.#store.deref(bubbles)],
      "activities=[bubbles]"
    );
    this.equalArrays(
      soap.activities.map((a) => a.name),
      ["Bubbles"],
      "activities.name=['Bubbles']"
    );
    this.equalArrays(
      soap.activities.map((a) => a[META] as ModelMeta),
      [{ status: "local" }],
      "activities.name=['Bubbles']"
    );
  }

  @test remoteRelationship() {
    let bubbles = this.#store.lazyRemote(Activity, "1");

    let soapId = this.#store.create(Material, {
      name: "Soap",
      source: null,
      activities: [bubbles],
      [META]: { status: "local" },
    });

    this.#store.fillLazy(
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
    this.equalArrays(
      soap.activities,
      [this.#store.deref(bubbles)],
      "activities=[bubbles]"
    );
    this.equalArrays(
      soap.activities.map((a) => a.name),
      ["Bubbles"],
      "activities.name=['Bubbles']"
    );
    this.equalArrays(
      soap.activities.map((a) => a[META] as ModelMeta),
      [{ status: "loaded" }],
      "activities.name=['Bubbles']"
    );
  }

  private stability<T, Args>(
    callback: (args: Args) => T,
    args: Args,
    desc: string
  ): Stability<Args, T> {
    let stability = new Stability(this.assert, callback, args, desc);
    stability.prime();
    return stability;
  }

  private equalArrays<T extends (SomeModel | string | ModelMeta)[]>(
    left: T,
    right: T,
    desc: string
  ): void {
    if (left.length !== right.length) {
      this.assert.equal(
        left.length,
        right.length,
        `${desc}: array lengths should be equal`
      );

      return;
    }

    let leftDiffs: { [key: string]: string } = {};
    let rightDiffs: { [key: string]: string } = {};
    let failed = false;

    left.forEach((leftValue, i) => {
      leftDiffs[i] = normalizeArrayValue(leftValue);
      rightDiffs[i] = normalizeArrayValue(right[i]);
    });

    this.assert.deepEqual(leftDiffs, rightDiffs, desc);
  }
}

function normalizeArrayValue(value: SomeModel | string | ModelMeta): string {
  if (typeof value === "string") {
    return value;
  } else if (value instanceof ModelConstructor) {
    return value[ID].localId;
  } else {
    return JSON.stringify(value);
  }
}
