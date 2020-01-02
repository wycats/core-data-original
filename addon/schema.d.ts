export default interface Schema {
    id: IdType;
    [key: string]: SchemaType;
}
export declare type IdType = {
    type: "id";
    columns: string[];
};
export declare type SchemaType = "string" | "number" | "boolean" | IdType | {
    type: "optional";
    inner: SchemaType;
} | {
    type: "entity";
    table: string;
};
export declare class SchemaBuilder {
    optional(type: SchemaType): SchemaType;
    one(table: string): SchemaType;
    id(...columns: string[]): IdType;
}
export declare const schema: SchemaBuilder;
