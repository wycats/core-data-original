var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import Route from "@ember/routing/route";
import { use } from "dummy/services/db";
export default class IndexRoute extends Route {
    model() {
        return this.spacex.all("launch");
    }
}
__decorate([
    use
], IndexRoute.prototype, "spacex", void 0);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxPQUFPLEtBQUssTUFBTSxzQkFBc0IsQ0FBQztBQUN6QyxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFHeEMsTUFBTSxDQUFDLE9BQU8sT0FBTyxVQUFXLFNBQVEsS0FBSztJQUczQyxLQUFLO1FBQ0gsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNuQyxDQUFDO0NBQ0Y7QUFMTTtJQUFKLEdBQUc7MENBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJvdXRlIGZyb20gXCJAZW1iZXIvcm91dGluZy9yb3V0ZVwiO1xuaW1wb3J0IHsgdXNlIH0gZnJvbSBcImR1bW15L3NlcnZpY2VzL2RiXCI7XG5pbXBvcnQgeyBTcGFjZXhEYiB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9zcGFjZXhcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5kZXhSb3V0ZSBleHRlbmRzIFJvdXRlIHtcbiAgQHVzZSBzcGFjZXghOiBTcGFjZXhEYjtcblxuICBtb2RlbCgpIHtcbiAgICByZXR1cm4gdGhpcy5zcGFjZXguYWxsKFwibGF1bmNoXCIpO1xuICB9XG59XG4iXX0=