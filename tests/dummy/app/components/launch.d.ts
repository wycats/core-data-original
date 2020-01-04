import Component from "@glimmer/component";
import { SpacexDb } from "../services/spacex";
import { Entity } from "core-data/table";
export default class Index extends Component {
    spacex: SpacexDb;
    args: {
        launch: Entity<"launch">;
    };
    book(e: MouseEvent & {
        target: HTMLInputElement;
    }): void;
}
