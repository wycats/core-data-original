import {
  ModelSchema,
  SomeRowId,
  RowId,
  IdKind,
  ModelManager,
  PresentId,
  ConstructorModelSchema,
} from "./manager";
import {
  SomeModelClass,
  SchemaForModelClass,
  DefinedModel,
  ID,
  ModelClass,
} from "./model";
import { Store } from ".";

export type ModelFactory<Row, Args> = (
  store: Store,
  args: Args,
  id: RowId<ModelFactory<Row, Args>, Row, IdKind>
) => Row;

export type ModelFactoryForModelClass<
  M extends SomeModelClass
> = M extends ModelClass<infer Schema, infer Row>
  ? ModelFactory<Row, ConstructorModelSchema<Schema>>
  : never;

export type SomeModelFactory = ModelFactory<any, any>;
export type SchemaForModelFactory<
  F extends SomeModelFactory
> = F extends ModelFactory<any, infer Row> ? Row : never;

export class ModelDefinition<
  Factory extends SomeModelFactory,
  Schema extends ModelSchema = SchemaForModelFactory<Factory>,
  Row = ReturnType<Factory>
>
  implements
    ModelManager<Factory, Schema, Row>,
    DefinedModel<Factory, ModelManager<Factory, Schema, Row>> {
  constructor(private factory: Factory) {}

  get manager() {
    return this;
  }

  get definition() {
    return this.factory;
  }

  create(
    store: Store,
    schema: Schema,
    id: RowId<Factory, Row, IdKind.LazyLocal> = RowId.lazyLocal(
      this.factory,
      store
    )
  ): { row: Row; id: RowId<Factory, Row, IdKind.Local> } {
    return {
      row: this.factory(store, schema, id) as Row,
      id,
    };
  }

  getRowId(bucket: Row): RowId<Factory, Row, PresentId> {
    return (bucket as any)[ID] as RowId<Factory, Row, PresentId>;
  }
}

export function table<Class extends ModelClass<any, any>>(
  Class: Class
): ModelDefinition<
  ModelFactoryForModelClass<Class>,
  SchemaForModelClass<Class>,
  InstanceType<Class>
> {
  return new ModelDefinition(
    ((
      store: Store,
      args: ConstructorModelSchema<SchemaForModelClass<Class>>,
      id: SomeRowId
    ) => new Class(store, args, id)) as ModelFactoryForModelClass<Class>
  );
}
