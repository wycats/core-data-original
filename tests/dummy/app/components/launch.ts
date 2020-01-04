import Component from "@glimmer/component";
import { use } from "../services/db";
import { SpacexDb } from "../services/spacex";
import { action } from "@ember/object";
import { Entity } from "core-data/table";

export default class Index extends Component {
  @use spacex!: SpacexDb;
  declare args: { launch: Entity<"launch"> };

  @action
  book(e: MouseEvent & { target: HTMLInputElement }) {
    this.spacex.update(this.args.launch, { isBooked: e.target.checked });
  }
}
