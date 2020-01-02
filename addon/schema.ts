export default interface Schema {
  id: IdType;
  [key: string]: SchemaType;
}

export type IdType = { type: "id"; columns: string[] };

export type SchemaType =
  | "string"
  | "number"
  | "boolean"
  | IdType
  | { type: "optional"; inner: SchemaType }
  | { type: "entity"; table: string };

export class SchemaBuilder {
  optional(type: SchemaType): SchemaType {
    return { type: "optional", inner: type };
  }

  one(table: string): SchemaType {
    return { type: "entity", table };
  }

  id(...columns: string[]): IdType {
    return { type: "id", columns: columns.length === 0 ? ["id"] : columns };
  }
}

export const schema = new SchemaBuilder();
