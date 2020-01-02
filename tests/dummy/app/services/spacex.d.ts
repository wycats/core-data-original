import Service from "@ember/service";
import Database, { Types } from "core-data/database";
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
export declare type SpacexDb = Database<SpacexSchema>;
export default class SpacexService extends Service {
    readonly state: Database<SpacexSchema>;
    constructor(owner: object);
}
