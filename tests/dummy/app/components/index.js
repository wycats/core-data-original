var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import Component from "@glimmer/component";
import { use } from "../services/db";
export default class Index extends Component {
    get questions() {
        return this.db.all("question");
    }
}
__decorate([
    use
], Index.prototype, "db", void 0);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxPQUFPLFNBQVMsTUFBTSxvQkFBb0IsQ0FBQztBQUMzQyxPQUFPLEVBQUUsR0FBRyxFQUFXLE1BQU0sZ0JBQWdCLENBQUM7QUFFOUMsTUFBTSxDQUFDLE9BQU8sT0FBTyxLQUFNLFNBQVEsU0FBUztJQUcxQyxJQUFJLFNBQVM7UUFDWCxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ2pDLENBQUM7Q0FDRjtBQUxNO0lBQUosR0FBRztpQ0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDb21wb25lbnQgZnJvbSBcIkBnbGltbWVyL2NvbXBvbmVudFwiO1xuaW1wb3J0IHsgdXNlLCBRYW5kYURiIH0gZnJvbSBcIi4uL3NlcnZpY2VzL2RiXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEluZGV4IGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgQHVzZSBkYiE6IFFhbmRhRGI7XG5cbiAgZ2V0IHF1ZXN0aW9ucygpIHtcbiAgICByZXR1cm4gdGhpcy5kYi5hbGwoXCJxdWVzdGlvblwiKTtcbiAgfVxufVxuIl19