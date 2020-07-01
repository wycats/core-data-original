import {
  createStore,
  DATA,
  DefinedModel,
  ID,
  Model,
  ModelArgs,
  ModelManager,
  RowId,
  RowValue,
  SomeModelClass,
  STORE,
  Store,
} from "ember-state";
import { module, QUnitAssert, test } from "../utils";

function attr<M extends ModelArgs, D = Exclude<M, RowValue | RowValue[]>>(
  _target: Model<M>,
  key: keyof D
): any {
  return {
    enumerable: true,
    configurable: true,
    get() {
      return this[DATA].attributes[key];
    },
  };
}

function hasMany<M extends ModelArgs, D = Extract<M, RowValue[]>>(
  _target: Model<M>,
  key: keyof D
): any {
  return {
    enumerable: true,
    configurable: true,
    get() {
      let objs: RowId<any, any>[] = this[DATA].hasMany[key];
      return objs.map((o) => this[STORE].deref(o));
    },
  };
}

class ModelDefinition<
  Class extends SomeModelClass,
  Row extends InstanceType<Class> = InstanceType<Class>,
  Args extends ModelArgs = Row extends Model<infer Args> ? Args : ModelArgs
>
  implements
    ModelManager<Class, Args, Row>,
    DefinedModel<Class, ModelManager<Class, Args, Row>> {
  constructor(private Class: Class) {}

  get manager() {
    return this;
  }

  get definition() {
    return this.Class;
  }

  create(
    store: Store,
    data: Args,
    id: RowId<Class, Row> = RowId.local(this.Class)
  ): Row {
    return new this.Class(store, data, id) as Row;
  }

  getRowId(bucket: Row): RowId<Class, Row> {
    return (bucket as any)[ID] as RowId<Class, Row>;
  }
}

interface MaterialData {
  name: string;
  source: string | null;
  activities: RowId<typeof Activity, Activity>[];
}

class Material extends Model<MaterialData> {
  @attr name!: string;
  @attr source!: string | null;
  @hasMany activities!: Activity[];
}

const MaterialTable = new ModelDefinition(Material);

interface ActivityData extends ModelArgs {
  name: string;
  category: string | null;
  materials: RowId<typeof Material, Material>[];
  days: RowId<typeof Day, Day>[];
}

class Activity extends Model<ActivityData> {
  @attr name!: string;
  @attr category!: string | null;
  @hasMany materials!: Material[];
  @hasMany days!: Day[];
}

const ActivityTable = new ModelDefinition(Activity);

interface DayData extends ModelArgs {
  date: string;
  activities: RowId<typeof Activity, Activity>[];
}

class Day extends Model<DayData> {
  @attr date!: string;
  @hasMany activities!: Activity[];
}

const DayTable = new ModelDefinition(Day);

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
    let material = store.table(MaterialTable);

    let soap = store.create(MaterialTable, {
      name: "Soap",
      source: null,
      activities: [],
    });

    let row = material.get(soap);

    this.assert.equal(row?.name, "Soap");
  }

  @test relationship() {
    let store = this.#store;
    let activities = store.table(ActivityTable);

    let bubbles = activities.preadd();

    let soap = store.create(MaterialTable, {
      name: "Soap",
      source: null,
      activities: [bubbles],
    });

    store.create(
      ActivityTable,
      {
        name: "Bubbles",
        category: null,
        materials: [soap],
        days: [],
      },
      bubbles
    );

    let soapRecord = store.deref(soap);
    this.assert.equal(soapRecord.name, "Soap", "name=Soap");
    this.assert.equal(soapRecord.source, null, "source=null");
    this.assert.deepEqual(
      soapRecord.activities,
      [store.deref(bubbles)],
      "activities=[bubbles]"
    );
    this.assert.deepEqual(
      soapRecord.activities.map((a) => a.name),
      ["Bubbles"],
      "activities.name=['Bubbles']"
    );
  }
}
