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
        return this.db.all("mission");
    }
}
__decorate([
    use
], IndexRoute.prototype, "db", void 0);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxPQUFPLEtBQUssTUFBTSxzQkFBc0IsQ0FBQztBQUN6QyxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFHeEMsTUFBTSxDQUFDLE9BQU8sT0FBTyxVQUFXLFNBQVEsS0FBSztJQUczQyxLQUFLO1FBQ0gsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNoQyxDQUFDO0NBQ0Y7QUFMTTtJQUFKLEdBQUc7c0NBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUm91dGUgZnJvbSBcIkBlbWJlci9yb3V0aW5nL3JvdXRlXCI7XG5pbXBvcnQgeyB1c2UgfSBmcm9tIFwiZHVtbXkvc2VydmljZXMvZGJcIjtcbmltcG9ydCB7IFNwYWNleERiIH0gZnJvbSBcIi4uL3NlcnZpY2VzL3NwYWNleFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbmRleFJvdXRlIGV4dGVuZHMgUm91dGUge1xuICBAdXNlIGRiITogU3BhY2V4RGI7XG5cbiAgbW9kZWwoKSB7XG4gICAgcmV0dXJuIHRoaXMuZGIuYWxsKFwibWlzc2lvblwiKTtcbiAgfVxufVxuIl19