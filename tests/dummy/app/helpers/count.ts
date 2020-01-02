import Helper from "@ember/component/helper";
import { MultipleSelection } from "core-data/selection";
import { QandaDb, use } from "../services/db";

export default class Count extends Helper {
  @use db!: QandaDb;

  compute([selection]: [
    MultipleSelection<{ [key: string]: unknown }, string>
  ]) {
    return selection.count();
  }
}
