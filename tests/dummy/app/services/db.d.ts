import Service from "@ember/service";
import Database, { Types } from "core-data/database";
import { Type, Entity } from "core-data/table";
export interface Question extends Type<QandaSchema> {
    title: string;
    body: string;
    by: Entity<"user">;
    selectedAnswer: Entity<"answer"> | null;
    upvotes: number;
    downvotes: number;
    rank: number;
}
export interface Answer extends Type<QandaSchema> {
    user: Entity<"user">;
    question: Entity<"question">;
    body: string;
    upvotes: number;
    downvotes: number;
}
export interface User extends Type<QandaSchema> {
    username: string;
}
export interface QandaSchema extends Types {
    question: Question;
    answer: Answer;
    user: User;
}
export declare type QandaDb = Database<QandaSchema>;
export default class DbService extends Service {
    readonly state: Database<QandaSchema>;
    constructor(owner: object);
}
export declare const use: (target: any, name: string) => void;
