var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import Component from "@glimmer/component";
import { use } from "../services/db";
import { action } from "@ember/object";
export default class Index extends Component {
    book(e) {
        this.spacex.update(this.args.launch, { isBooked: e.target.checked });
    }
}
__decorate([
    use
], Index.prototype, "spacex", void 0);
__decorate([
    action
], Index.prototype, "book", null);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF1bmNoLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibGF1bmNoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLE9BQU8sU0FBUyxNQUFNLG9CQUFvQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVyQyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBR3ZDLE1BQU0sQ0FBQyxPQUFPLE9BQU8sS0FBTSxTQUFRLFNBQVM7SUFLMUMsSUFBSSxDQUFDLENBQTRDO1FBQy9DLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztJQUN2RSxDQUFDO0NBQ0Y7QUFQTTtJQUFKLEdBQUc7cUNBQW1CO0FBSXZCO0lBREMsTUFBTTtpQ0FHTiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDb21wb25lbnQgZnJvbSBcIkBnbGltbWVyL2NvbXBvbmVudFwiO1xuaW1wb3J0IHsgdXNlIH0gZnJvbSBcIi4uL3NlcnZpY2VzL2RiXCI7XG5pbXBvcnQgeyBTcGFjZXhEYiB9IGZyb20gXCIuLi9zZXJ2aWNlcy9zcGFjZXhcIjtcbmltcG9ydCB7IGFjdGlvbiB9IGZyb20gXCJAZW1iZXIvb2JqZWN0XCI7XG5pbXBvcnQgeyBFbnRpdHkgfSBmcm9tIFwiY29yZS1kYXRhL3RhYmxlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEluZGV4IGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgQHVzZSBzcGFjZXghOiBTcGFjZXhEYjtcbiAgZGVjbGFyZSBhcmdzOiB7IGxhdW5jaDogRW50aXR5PFwibGF1bmNoXCI+IH07XG5cbiAgQGFjdGlvblxuICBib29rKGU6IE1vdXNlRXZlbnQgJiB7IHRhcmdldDogSFRNTElucHV0RWxlbWVudCB9KSB7XG4gICAgdGhpcy5zcGFjZXgudXBkYXRlKHRoaXMuYXJncy5sYXVuY2gsIHsgaXNCb29rZWQ6IGUudGFyZ2V0LmNoZWNrZWQgfSk7XG4gIH1cbn1cbiJdfQ==