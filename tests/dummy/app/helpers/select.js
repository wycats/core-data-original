var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import Helper from "@ember/component/helper";
import { use } from "dummy/services/db";
export default class Select extends Helper {
    compute([column], { from }) {
        return this.db.find(from).select(column)[column];
    }
}
__decorate([
    use
], Select.prototype, "db", void 0);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2VsZWN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLE9BQU8sTUFBTSxNQUFNLHlCQUF5QixDQUFDO0FBRzdDLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUV4QyxNQUFNLENBQUMsT0FBTyxPQUFPLE1BQU8sU0FBUSxNQUFNO0lBR3hDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBVyxFQUFFLEVBQUUsSUFBSSxFQUE0QjtRQUM1RCxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNuRCxDQUFDO0NBQ0Y7QUFMTTtJQUFKLEdBQUc7a0NBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEhlbHBlciBmcm9tIFwiQGVtYmVyL2NvbXBvbmVudC9oZWxwZXJcIjtcbmltcG9ydCBEYXRhYmFzZSBmcm9tIFwiY29yZS1kYXRhL2RhdGFiYXNlXCI7XG5pbXBvcnQgeyBFbnRpdHkgfSBmcm9tIFwiY29yZS1kYXRhL3RhYmxlXCI7XG5pbXBvcnQgeyB1c2UgfSBmcm9tIFwiZHVtbXkvc2VydmljZXMvZGJcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2VsZWN0IGV4dGVuZHMgSGVscGVyIHtcbiAgQHVzZSBkYiE6IERhdGFiYXNlPGFueT47XG5cbiAgY29tcHV0ZShbY29sdW1uXTogW3N0cmluZ10sIHsgZnJvbSB9OiB7IGZyb206IEVudGl0eTxzdHJpbmc+IH0pIHtcbiAgICByZXR1cm4gdGhpcy5kYi5maW5kKGZyb20pLnNlbGVjdChjb2x1bW4pW2NvbHVtbl07XG4gIH1cbn1cbiJdfQ==