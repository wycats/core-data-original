var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import Helper from "@ember/component/helper";
import { use } from "dummy/services/db";
export default class Select extends Helper {
    compute([...columns], { from, db = this.db }) {
        if (columns.length === 1) {
            return compute(columns[0], from, db);
        }
        else {
            let out = Object.create(null);
            for (let column of columns) {
                compute(column, from, db, out);
            }
            return out;
        }
    }
}
__decorate([
    use
], Select.prototype, "db", void 0);
function compute(column, from, db, out) {
    if (column.includes(".")) {
        computePath(column.split("."), from, db, out);
    }
    else if (out) {
        out[column] = db.find(from).select(column)[column];
    }
    else {
        return db.find(from).select(column)[column];
    }
}
function computePath(parts, from, db, out = Object.create(null)) {
    if (parts.length === 1) {
        let part = parts[0];
        out[part] = compute(part, from, db);
    }
    else {
        let [head, ...tail] = parts;
        if (out[head] === undefined) {
            out[head] = Object.create(null);
        }
        let nextEntity = db.find(from).select(head)[head];
        computePath(tail, nextEntity, db, out[head]);
    }
    return out;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2VsZWN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLE9BQU8sTUFBTSxNQUFNLHlCQUF5QixDQUFDO0FBRzdDLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUV4QyxNQUFNLENBQUMsT0FBTyxPQUFPLE1BQU8sU0FBUSxNQUFNO0lBR3hDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsT0FBTyxDQUFXLEVBQUUsRUFBRSxJQUFJLEVBQUUsRUFBRSxHQUFHLElBQUksQ0FBQyxFQUFFLEVBQWdEO1FBQ2xHLElBQUksT0FBTyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDeEIsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztTQUN0QzthQUFNO1lBQ0wsSUFBSSxHQUFHLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUU5QixLQUFLLElBQUksTUFBTSxJQUFJLE9BQU8sRUFBRTtnQkFDMUIsT0FBTyxDQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO2FBQ2hDO1lBRUQsT0FBTyxHQUFHLENBQUM7U0FDWjtJQUNILENBQUM7Q0FDRjtBQWZNO0lBQUosR0FBRztrQ0FBb0I7QUFpQjFCLFNBQVMsT0FBTyxDQUFDLE1BQWMsRUFBRSxJQUFvQixFQUFFLEVBQWlCLEVBQUUsR0FBZ0M7SUFDeEcsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1FBQ3hCLFdBQVcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7S0FDL0M7U0FBTSxJQUFJLEdBQUcsRUFBRTtRQUNkLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUNwRDtTQUFNO1FBQ0wsT0FBTyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUM3QztBQUNILENBQUM7QUFFRCxTQUFTLFdBQVcsQ0FBQyxLQUFlLEVBQUUsSUFBb0IsRUFBRSxFQUFpQixFQUFFLEdBQUcsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztJQUN0RyxJQUFJLEtBQUssQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1FBQ3RCLElBQUksSUFBSSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVwQixHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsT0FBTyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7S0FDckM7U0FBTTtRQUNMLElBQUksQ0FBQyxJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxLQUFLLENBQUM7UUFFNUIsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssU0FBUyxFQUFFO1lBQzNCLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFBO1NBQ2hDO1FBRUQsSUFBSSxVQUFVLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFbEQsV0FBVyxDQUFDLElBQUksRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0tBQzlDO0lBRUQsT0FBTyxHQUFHLENBQUM7QUFDYixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEhlbHBlciBmcm9tIFwiQGVtYmVyL2NvbXBvbmVudC9oZWxwZXJcIjtcbmltcG9ydCBEYXRhYmFzZSBmcm9tIFwiY29yZS1kYXRhL2RhdGFiYXNlXCI7XG5pbXBvcnQgeyBFbnRpdHkgfSBmcm9tIFwiY29yZS1kYXRhL3RhYmxlXCI7XG5pbXBvcnQgeyB1c2UgfSBmcm9tIFwiZHVtbXkvc2VydmljZXMvZGJcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2VsZWN0IGV4dGVuZHMgSGVscGVyIHtcbiAgQHVzZSBkYiE6IERhdGFiYXNlPGFueT47XG5cbiAgY29tcHV0ZShbLi4uY29sdW1uc106IFtzdHJpbmddLCB7IGZyb20sIGRiID0gdGhpcy5kYiB9OiB7IGZyb206IEVudGl0eTxzdHJpbmc+LCBkYj86IERhdGFiYXNlPGFueT4gfSkge1xuICAgIGlmIChjb2x1bW5zLmxlbmd0aCA9PT0gMSkge1xuICAgICAgcmV0dXJuIGNvbXB1dGUoY29sdW1uc1swXSwgZnJvbSwgZGIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgb3V0ID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcblxuICAgICAgZm9yIChsZXQgY29sdW1uIG9mIGNvbHVtbnMpIHtcbiAgICAgICAgY29tcHV0ZShjb2x1bW4sIGZyb20sIGRiLCBvdXQpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gb3V0O1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBjb21wdXRlKGNvbHVtbjogc3RyaW5nLCBmcm9tOiBFbnRpdHk8c3RyaW5nPiwgZGI6IERhdGFiYXNlPGFueT4sIG91dD86IHsgW2tleTogc3RyaW5nXTogdW5rbm93biB9KSB7XG4gIGlmIChjb2x1bW4uaW5jbHVkZXMoXCIuXCIpKSB7XG4gICAgY29tcHV0ZVBhdGgoY29sdW1uLnNwbGl0KFwiLlwiKSwgZnJvbSwgZGIsIG91dCk7XG4gIH0gZWxzZSBpZiAob3V0KSB7XG4gICAgb3V0W2NvbHVtbl0gPSBkYi5maW5kKGZyb20pLnNlbGVjdChjb2x1bW4pW2NvbHVtbl07XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGRiLmZpbmQoZnJvbSkuc2VsZWN0KGNvbHVtbilbY29sdW1uXTtcbiAgfVxufVxuXG5mdW5jdGlvbiBjb21wdXRlUGF0aChwYXJ0czogc3RyaW5nW10sIGZyb206IEVudGl0eTxzdHJpbmc+LCBkYjogRGF0YWJhc2U8YW55Piwgb3V0ID0gT2JqZWN0LmNyZWF0ZShudWxsKSkge1xuICBpZiAocGFydHMubGVuZ3RoID09PSAxKSB7XG4gICAgbGV0IHBhcnQgPSBwYXJ0c1swXTtcblxuICAgIG91dFtwYXJ0XSA9IGNvbXB1dGUocGFydCwgZnJvbSwgZGIpO1xuICB9IGVsc2Uge1xuICAgIGxldCBbaGVhZCwgLi4udGFpbF0gPSBwYXJ0cztcblxuICAgIGlmIChvdXRbaGVhZF0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgb3V0W2hlYWRdID0gT2JqZWN0LmNyZWF0ZShudWxsKVxuICAgIH1cblxuICAgIGxldCBuZXh0RW50aXR5ID0gZGIuZmluZChmcm9tKS5zZWxlY3QoaGVhZClbaGVhZF07XG5cbiAgICBjb21wdXRlUGF0aCh0YWlsLCBuZXh0RW50aXR5LCBkYiwgb3V0W2hlYWRdKTtcbiAgfVxuXG4gIHJldHVybiBvdXQ7XG59XG4iXX0=