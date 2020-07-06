import {
  ModelData,
  SomeRowId,
  RowId,
  IdKind,
  ModelManager,
  PresentId,
  SomeModelSchema,
  ModelDataArgs,
  ModelMetadataArgs,
  ModelSchema,
  META,
} from "./manager";
import {
  SomeModelClass,
  SchemaForModelClass,
  DefinedModel,
  ID,
  ModelClass,
  RowForModelClass,
} from "./model";
import { Store } from "./index";

export type ModelFactory<Row, Data extends ModelData, Meta> = (
  store: Store,
  data: Data,
  meta: Meta,
  id: RowId<ModelFactory<Row, Data, Meta>, Row>
) => Row;

export type ModelFactoryForModelClass<
  M extends SomeModelClass
> = M extends ModelClass<infer Schema, infer Row>
  ? ModelFactory<Row, ModelDataArgs<Schema>, ModelMetadataArgs<Schema>>
  : never;

export type SomeModelFactory = ModelFactory<any, any, any>;
export type DataForModelFactory<
  F extends SomeModelFactory
> = F extends ModelFactory<any, infer Row, any> ? Row : never;

export type MetaForModelFactory<
  F extends SomeModelFactory
> = F extends ModelFactory<any, any, infer Meta> ? Meta : never;

export type SchemaForModelFactory<
  F extends SomeModelFactory
> = F extends ModelFactory<any, infer Data, infer Meta>
  ? ModelSchema<Data, Meta>
  : never;

export class ModelDefinition<
  Factory extends SomeModelFactory,
  Schema extends SomeModelSchema = SchemaForModelFactory<Factory>,
  Row = ReturnType<Factory>
>
  implements
    ModelManager<Factory, Schema, Row>,
    DefinedModel<Factory, ModelManager<Factory, Schema, Row>> {
  constructor(private factory: Factory, readonly name: string) {}

  get manager() {
    return this;
  }

  get definition() {
    return this.factory;
  }

  create(
    store: Store,
    data: Schema[string],
    meta: Schema[META],
    id: RowId<Factory, Row> = RowId.lazyLocal(this.factory, store)
  ): { row: Row; id: RowId<Factory, Row> } {
    return {
      row: this.factory(store, data, meta, id) as Row,
      id,
    };
  }

  getRowId(bucket: Row): RowId<Factory, Row> {
    return (bucket as any)[ID] as RowId<Factory, Row>;
  }
}

export function table<Class extends SomeModelClass>(
  Class: Class
): ModelDefinition<
  ModelFactoryForModelClass<Class>,
  SchemaForModelClass<Class>,
  RowForModelClass<Class>
> {
  return new ModelDefinition(
    ((
      store: Store,
      data: ModelDataArgs<SchemaForModelClass<Class>>,
      meta: ModelMetadataArgs<SchemaForModelClass<Class>>,
      id: SomeRowId
    ) => new Class(store, data, meta, id)) as ModelFactoryForModelClass<Class>,
    Class.name
  );
}
