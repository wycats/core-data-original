var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import Helper from "@ember/component/helper";
import { use } from "../services/db";
export default class Count extends Helper {
    compute([selection]) {
        return selection.count();
    }
}
__decorate([
    use
], Count.prototype, "db", void 0);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY291bnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb3VudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxPQUFPLE1BQU0sTUFBTSx5QkFBeUIsQ0FBQztBQUU3QyxPQUFPLEVBQVcsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFOUMsTUFBTSxDQUFDLE9BQU8sT0FBTyxLQUFNLFNBQVEsTUFBTTtJQUd2QyxPQUFPLENBQUMsQ0FBQyxTQUFTLENBRWpCO1FBQ0MsT0FBTyxTQUFTLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDM0IsQ0FBQztDQUNGO0FBUE07SUFBSixHQUFHO2lDQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEhlbHBlciBmcm9tIFwiQGVtYmVyL2NvbXBvbmVudC9oZWxwZXJcIjtcbmltcG9ydCB7IE11bHRpcGxlU2VsZWN0aW9uIH0gZnJvbSBcImNvcmUtZGF0YS9zZWxlY3Rpb25cIjtcbmltcG9ydCB7IFFhbmRhRGIsIHVzZSB9IGZyb20gXCIuLi9zZXJ2aWNlcy9kYlwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb3VudCBleHRlbmRzIEhlbHBlciB7XG4gIEB1c2UgZGIhOiBRYW5kYURiO1xuXG4gIGNvbXB1dGUoW3NlbGVjdGlvbl06IFtcbiAgICBNdWx0aXBsZVNlbGVjdGlvbjx7IFtrZXk6IHN0cmluZ106IHVua25vd24gfSwgc3RyaW5nPlxuICBdKSB7XG4gICAgcmV0dXJuIHNlbGVjdGlvbi5jb3VudCgpO1xuICB9XG59XG4iXX0=