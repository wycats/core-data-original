var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import Route from "@ember/routing/route";
import { use } from "dummy/services/db";
export default class QuestionRoute extends Route {
    model({ id }) {
        return { table: "question", id: [id] };
    }
    serialize(entity) {
        return { id: entity.id[0] };
    }
}
__decorate([
    use
], QuestionRoute.prototype, "db", void 0);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlc3Rpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJxdWVzdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxPQUFPLEtBQUssTUFBTSxzQkFBc0IsQ0FBQztBQUN6QyxPQUFPLEVBQUUsR0FBRyxFQUFXLE1BQU0sbUJBQW1CLENBQUM7QUFHakQsTUFBTSxDQUFDLE9BQU8sT0FBTyxhQUFjLFNBQVEsS0FBSztJQUc5QyxLQUFLLENBQUMsRUFBRSxFQUFFLEVBQWtCO1FBQzFCLE9BQU8sRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7SUFDekMsQ0FBQztJQUVELFNBQVMsQ0FBQyxNQUEwQjtRQUNsQyxPQUFPLEVBQUUsRUFBRSxFQUFFLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUM5QixDQUFDO0NBQ0Y7QUFUTTtJQUFKLEdBQUc7eUNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUm91dGUgZnJvbSBcIkBlbWJlci9yb3V0aW5nL3JvdXRlXCI7XG5pbXBvcnQgeyB1c2UsIFFhbmRhRGIgfSBmcm9tIFwiZHVtbXkvc2VydmljZXMvZGJcIjtcbmltcG9ydCB7IEVudGl0eSB9IGZyb20gXCJjb3JlLWRhdGEvdGFibGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUXVlc3Rpb25Sb3V0ZSBleHRlbmRzIFJvdXRlIHtcbiAgQHVzZSBkYiE6IFFhbmRhRGI7XG5cbiAgbW9kZWwoeyBpZCB9OiB7IGlkOiBzdHJpbmcgfSk6IEVudGl0eTxcInF1ZXN0aW9uXCI+IHtcbiAgICByZXR1cm4geyB0YWJsZTogXCJxdWVzdGlvblwiLCBpZDogW2lkXSB9O1xuICB9XG5cbiAgc2VyaWFsaXplKGVudGl0eTogRW50aXR5PFwicXVlc3Rpb25cIj4pIHtcbiAgICByZXR1cm4geyBpZDogZW50aXR5LmlkWzBdIH07XG4gIH1cbn1cbiJdfQ==