import Service from "@ember/service";
import Database, { Types } from "core-data/database";
import { schema } from "core-data/schema";
import { Type, Entity } from "core-data/table";

export interface Launch extends Type<SpacexSchema> {
  site: string;
  mission: Entity<"mission">;
  rocket: Entity<"rocket">;
  isBooked: boolean;
}

export interface Rocket extends Type<SpacexSchema> {
  name: string;
  type: string;
}

export interface Mission extends Type<SpacexSchema> {
  name: string;
}

export interface SpacexSchema extends Types {
  launch: Launch;
  mission: Mission;
  rocket: Rocket;
}

export type SpacexDb = Database<SpacexSchema>;

export default class SpacexService extends Service {
  readonly state = Database.create<SpacexSchema>();

  constructor(owner: object) {
    super(owner);

    let db = this.state;

    db.define("launch", {
      id: schema.id(),
      site: "string",
      mission: schema.one("mission"),
      rocket: schema.one("rocket"),
      isBooked: "boolean"
    });

    db.define("rocket", {
      id: schema.id(),
      name: "string",
      type: "string"
    });

    db.define("mission", {
      id: schema.id("name"),
      name: "string"
    });
  }
}
