import Helper from "@ember/component/helper";
import { getOwner } from "@ember/application";

export default class Use extends Helper {
  compute([name]: [string]) {
    return getOwner(this).lookup(`service:${name}`).state;
  }
}
