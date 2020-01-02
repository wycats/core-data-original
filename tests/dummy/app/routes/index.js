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
    serialize(entity) {
        return { id: entity.id[0] };
    }
}
__decorate([
    use
], IndexRoute.prototype, "db", void 0);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxPQUFPLEtBQUssTUFBTSxzQkFBc0IsQ0FBQztBQUN6QyxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFJeEMsTUFBTSxDQUFDLE9BQU8sT0FBTyxVQUFXLFNBQVEsS0FBSztJQUczQyxLQUFLO1FBQ0gsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBRUQsU0FBUyxDQUFDLE1BQTBCO1FBQ2xDLE9BQU8sRUFBRSxFQUFFLEVBQUUsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0lBQzlCLENBQUM7Q0FDRjtBQVRNO0lBQUosR0FBRztzQ0FBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSb3V0ZSBmcm9tIFwiQGVtYmVyL3JvdXRpbmcvcm91dGVcIjtcbmltcG9ydCB7IHVzZSB9IGZyb20gXCJkdW1teS9zZXJ2aWNlcy9kYlwiO1xuaW1wb3J0IHsgRW50aXR5IH0gZnJvbSBcImNvcmUtZGF0YS90YWJsZVwiO1xuaW1wb3J0IHsgU3BhY2V4RGIgfSBmcm9tIFwiLi4vc2VydmljZXMvc3BhY2V4XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEluZGV4Um91dGUgZXh0ZW5kcyBSb3V0ZSB7XG4gIEB1c2UgZGIhOiBTcGFjZXhEYjtcblxuICBtb2RlbCgpIHtcbiAgICByZXR1cm4gdGhpcy5kYi5hbGwoXCJtaXNzaW9uXCIpO1xuICB9XG5cbiAgc2VyaWFsaXplKGVudGl0eTogRW50aXR5PFwicXVlc3Rpb25cIj4pIHtcbiAgICByZXR1cm4geyBpZDogZW50aXR5LmlkWzBdIH07XG4gIH1cbn1cbiJdfQ==