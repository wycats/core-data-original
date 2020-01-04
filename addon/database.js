import { INTERNAL_ROW, MultipleSelection, SingleSelection } from "./selection";
import Table, { EMPTY, SCHEMA, } from "./table";
import { expect } from "./utils";
export const FIND = Symbol("FIND");
export default class Database {
    constructor(tables) {
        this.tables = new Map();
        this.tables = tables;
    }
    static create() {
        return new Database(new Map());
    }
    define(name, schema) {
        this.tables.set(name, new Table(name, schema));
    }
    empty() {
        let tables = new Map();
        for (let [key, table] of this.tables) {
            tables.set(key, table[EMPTY]());
        }
        return new Database(tables);
    }
    [FIND](entity) {
        let table = this.get(entity.table);
        return table.get(entity.id);
    }
    first(name) {
        let table = this.get(name);
        return new SingleSelection(this, table.first());
    }
    all(name) {
        return new MultipleSelection(this, name);
    }
    find(nameOrEntity, id) {
        if (typeof nameOrEntity === "string") {
            this.get(nameOrEntity);
            return new SingleSelection(this, {
                table: nameOrEntity,
                id: [id]
            });
        }
        else {
            this.get(nameOrEntity.table);
            return new SingleSelection(this, {
                table: nameOrEntity.table,
                id: nameOrEntity.id
            });
        }
    }
    get(name) {
        let table = this.tables.get(name);
        expect(table, `Unexpected table name ${name}`);
        return table;
    }
    update(entity, updates) {
        let row = this.find(entity);
        row[INTERNAL_ROW].update(updates);
    }
    add(name, row) {
        let table = this.get(name);
        table.add(row);
    }
    populate(name, data, amount) {
        let table = this.get(name);
        let schema = table[SCHEMA];
        let out = [];
        for (let i = 0; i < amount; i++) {
            out.push(table.add(fake(data, schema)).entity);
        }
        return out;
    }
    nextId() {
        return [`${ID++}`];
    }
}
let ID = 1;
function fake(data, schema) {
    let out = Object.create(null);
    for (let key of Object.keys(data)) {
        out[key] = data[key]();
    }
    let idColumns = schema.id.columns;
    if ("id" in data) {
        out.id = idColumns.map(column => out[column]);
    }
    else {
        out.id = [`${ID++}`];
    }
    return out;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWJhc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkYXRhYmFzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsWUFBWSxFQUFFLGlCQUFpQixFQUFFLGVBQWUsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUMvRSxPQUFPLEtBQUssRUFBRSxFQUVaLEtBQUssRUFHTCxNQUFNLEdBR1AsTUFBTSxTQUFTLENBQUM7QUFDakIsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLFNBQVMsQ0FBQztBQU1qQyxNQUFNLENBQUMsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBTW5DLE1BQU0sQ0FBQyxPQUFPLE9BQU8sUUFBUTtJQU8zQixZQUFvQixNQUFnRDtRQUYzRCxXQUFNLEdBQUcsSUFBSSxHQUFHLEVBQXVDLENBQUM7UUFHL0QsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7SUFDdkIsQ0FBQztJQVJELE1BQU0sQ0FBQyxNQUFNO1FBQ1gsT0FBTyxJQUFJLFFBQVEsQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDLENBQUM7SUFDakMsQ0FBQztJQVFELE1BQU0sQ0FBNkIsSUFBTyxFQUFFLE1BQWM7UUFDeEQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLElBQUksS0FBSyxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ2pELENBQUM7SUFFRCxLQUFLO1FBQ0gsSUFBSSxNQUFNLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUV2QixLQUFLLElBQUksQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNwQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQ2pDO1FBRUQsT0FBTyxJQUFJLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztJ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LE1BQWM7SUFFZCxJQUFJLEdBQUcsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBRTlCLEtBQUssSUFBSSxHQUFHLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRTtRQUNqQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7S0FDeEI7SUFFRCxJQUFJLFNBQVMsR0FBRyxNQUFNLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQztJQUVsQyxJQUFJLElBQUksSUFBSSxJQUFJLEVBQUU7UUFDaEIsR0FBRyxDQUFDLEVBQUUsR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7S0FDL0M7U0FBTTtRQUNMLEdBQUcsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxHQUFHLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztLQUN0QjtJQUVELE9BQU8sR0FBRyxDQUFDO0FBQ2IsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBTY2hlbWEgZnJvbSBcIi4vc2NoZW1hXCI7XG5pbXBvcnQgeyBJTlRFUk5BTF9ST1csIE11bHRpcGxlU2VsZWN0aW9uLCBTaW5nbGVTZWxlY3Rpb24gfSBmcm9tIFwiLi9zZWxlY3Rpb25cIjtcbmltcG9ydCBUYWJsZSwge1xuICBEYXRhVmFsdWUsXG4gIEVNUFRZLFxuICBFbnRpdHksXG4gIEludGVybmFsUm93LFxuICBTQ0hFTUEsXG4gIFNwZWNpZmllZFJvdyxcbiAgUHJpbWFyeUtleSxcbn0gZnJvbSBcIi4vdGFibGVcIjtcbmltcG9ydCB7IGV4cGVjdCB9IGZyb20gXCIuL3V0aWxzXCI7XG5cbmludGVyZmFjZSBGYWtlRGF0YSB7XG4gIFtrZXk6IHN0cmluZ106ICgpID0+IHVua25vd247XG59XG5cbmV4cG9ydCBjb25zdCBGSU5EID0gU3ltYm9sKFwiRklORFwiKTtcblxuZXhwb3J0IGludGVyZmFjZSBUeXBlcyB7XG4gIC8vIFtrZXk6IHN0cmluZ106IFR5cGU8VHlwZXM+O1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEYXRhYmFzZTxUIGV4dGVuZHMgVHlwZXM+IHtcbiAgc3RhdGljIGNyZWF0ZTxUIGV4dGVuZHMgVHlwZXM+KCk6IERhdGFiYXNlPFQ+IHtcbiAgICByZXR1cm4gbmV3IERhdGFiYXNlKG5ldyBNYXAoKSk7XG4gIH1cblxuICByZWFkb25seSB0YWJsZXMgPSBuZXcgTWFwPGtleW9mIFQsIFRhYmxlPFQsIGtleW9mIFQgJiBzdHJpbmc+PigpO1xuXG4gIHByaXZhdGUgY29uc3RydWN0b3IodGFibGVzOiBNYXA8a2V5b2YgVCwgVGFibGU8VCwga2V5b2YgVCAmIHN0cmluZz4+KSB7XG4gICAgdGhpcy50YWJsZXMgPSB0YWJsZXM7XG4gIH1cblxuICBkZWZpbmU8TiBleHRlbmRzIGtleW9mIFQgJiBzdHJpbmc+KG5hbWU6IE4sIHNjaGVtYTogU2NoZW1hKSB7XG4gICAgdGhpcy50YWJsZXMuc2V0KG5hbWUsIG5ldyBUYWJsZShuYW1lLCBzY2hlbWEpKTtcbiAgfVxuXG4gIGVtcHR5KCk6IERhdGFiYXNlPFQ+IHtcbiAgICBsZXQgdGFibGVzID0gbmV3IE1hcCgpO1xuXG4gICAgZm9yIChsZXQgW2tleSwgdGFibGVdIG9mIHRoaXMudGFibGVzKSB7XG4gICAgICB0YWJsZXMuc2V0KGtleSwgdGFibGVbRU1QVFldKCkpO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgRGF0YWJhc2UodGFibGVzKTtcbiAgfVxuXG4gIFtGSU5EXTxOIGV4dGVuZHMga2V5b2YgVCAmIHN0cmluZz4oZW50aXR5OiBFbnRpdHk8Tj4pOiBJbnRlcm5hbFJvdzxULCBOPiB7XG4gICAgbGV0IHRhYmxlOiBUYWJsZTxULCBOPiA9IHRoaXMuZ2V0KGVudGl0eS50YWJsZSk7XG4gICAgcmV0dXJuIHRhYmxlLmdldChlbnRpdHkuaWQpO1xuICB9XG5cbiAgZmlyc3Q8TiBleHRlbmRzIGtleW9mIFQgJiBzdHJpbmc+KG5hbWU6IE4pOiBTaW5nbGVTZWxlY3Rpb248VCwgTj4ge1xuICAgIGxldCB0YWJsZSA9IHRoaXMuZ2V0KG5hbWUpO1xuICAgIHJldHVybiBuZXcgU2luZ2xlU2VsZWN0aW9uKHRoaXMsIHRhYmxlLmZpcnN0KCkpO1xuICB9XG5cbiAgYWxsPE4gZXh0ZW5kcyBrZXlvZiBUICYgc3RyaW5nPihuYW1lOiBOICYga2V5b2YgVCk6IE11bHRpcGxlU2VsZWN0aW9uPFQsIE4+IHtcbiAgICByZXR1cm4gbmV3IE11bHRpcGxlU2VsZWN0aW9uKHRoaXMsIG5hbWUpO1xuICB9XG5cbiAgZmluZDxOIGV4dGVuZHMga2V5b2YgVCAmIHN0cmluZz4obmFtZTogTiwgaWQ6IHN0cmluZyk6IFNpbmdsZVNlbGVjdGlvbjxULCBOPjtcbiAgZmluZDxOIGV4dGVuZHMga2V5b2YgVCAmIHN0cmluZz4oZW50aXR5OiBFbnRpdHk8Tj4pOiBTaW5nbGVTZWxlY3Rpb248VCwgTj47XG4gIGZpbmQ8TiBleHRlbmRzIGtleW9mIFQgJiBzdHJpbmc+KFxuICAgIG5hbWVPckVudGl0eTogTiB8IEVudGl0eTxOPixcbiAgICBpZD86IHN0cmluZ1xuICApOiBTaW5nbGVTZWxlY3Rpb248VCwgTj4ge1xuICAgIGlmICh0eXBlb2YgbmFtZU9yRW50aXR5ID09PSBcInN0cmluZ1wiKSB7XG4gICAgICB0aGlzLmdldChuYW1lT3JFbnRpdHkpO1xuXG4gICAgICByZXR1cm4gbmV3IFNpbmdsZVNlbGVjdGlvbih0aGlzLCB7XG4gICAgICAgIHRhYmxlOiBuYW1lT3JFbnRpdHksXG4gICAgICAgIGlkOiBbaWQgYXMgc3RyaW5nXVxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZ2V0KG5hbWVPckVudGl0eS50YWJsZSk7XG5cbiAgICAgIHJldHVybiBuZXcgU2luZ2xlU2VsZWN0aW9uKHRoaXMsIHtcbiAgICAgICAgdGFibGU6IG5hbWVPckVudGl0eS50YWJsZSxcbiAgICAgICAgaWQ6IG5hbWVPckVudGl0eS5pZFxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgZ2V0PE4gZXh0ZW5kcyBrZXlvZiBUICYgc3RyaW5nPihuYW1lOiBOKTogVGFibGU8VCwgTj4ge1xuICAgIGxldCB0YWJsZSA9IHRoaXMudGFibGVzLmdldChuYW1lKTtcbiAgICBleHBlY3QodGFibGUsIGBVbmV4cGVjdGVkIHRhYmxlIG5hbWUgJHtuYW1lfWApO1xuICAgIHJldHVybiB0YWJsZSBhcyBUYWJsZTxULCBOPjtcbiAgfVxuXG4gIHVwZGF0ZTxOIGV4dGVuZHMga2V5b2YgVCAmIHN0cmluZz4oXG4gICAgZW50aXR5OiBFbnRpdHk8Tj4sXG4gICAgdXBkYXRlczogeyBba2V5OiBzdHJpbmddOiBEYXRhVmFsdWU8VD4gfVxuICApIHtcbiAgICBsZXQgcm93ID0gdGhpcy5maW5kKGVudGl0eSk7XG4gICAgcm93W0lOVEVSTkFMX1JPV10udXBkYXRlKHVwZGF0ZXMpO1xuICB9XG5cbiAgYWRkPE4gZXh0ZW5kcyBrZXlvZiBUICYgc3RyaW5nPihcbiAgICBuYW1lOiBOLFxuICAgIHJvdzogU3BlY2lmaWVkUm93PFQsIE4+LFxuICApOiB2b2lkIHtcbiAgICBsZXQgdGFibGUgPSB0aGlzLmdldChuYW1lKTtcbiAgICB0YWJsZS5hZGQocm93KTtcbiAgfVxuXG4gIHBvcHVsYXRlPE4gZXh0ZW5kcyBrZXlvZiBUICYgc3RyaW5nPihcbiAgICBuYW1lOiBOLFxuICAgIGRhdGE6IEZha2VEYXRhLFxuICAgIGFtb3VudDogbnVtYmVyXG4gICk6IEVudGl0eTxOPltdIHtcbiAgICBsZXQgdGFibGUgPSB0aGlzLmdldChuYW1lKTtcbiAgICBsZXQgc2NoZW1hID0gdGFibGVbU0NIRU1BXTtcblxuICAgIGxldCBvdXQ6IEVudGl0eTxOPltdID0gW107XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFtb3VudDsgaSsrKSB7XG4gICAgICBvdXQucHVzaCh0YWJsZS5hZGQoZmFrZShkYXRhLCBzY2hlbWEpKS5lbnRpdHkpO1xuICAgIH1cblxuICAgIHJldHVybiBvdXQ7XG4gIH1cblxuICBuZXh0SWQoKTogUHJpbWFyeUtleSB7XG4gICAgcmV0dXJuIFtgJHtJRCsrfWBdO1xuICB9XG59XG5cbmxldCBJRCA9IDE7XG5cbmZ1bmN0aW9uIGZha2U8VCBleHRlbmRzIFR5cGVzLCBOIGV4dGVuZHMga2V5b2YgVCAmIHN0cmluZz4oXG4gIGRhdGE6IEZha2VEYXRhLFxuICBzY2hlbWE6IFNjaGVtYVxuKTogU3BlY2lmaWVkUm93PFQsIE4+IHtcbiAgbGV0IG91dCA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG5cbiAgZm9yIChsZXQga2V5IG9mIE9iamVjdC5rZXlzKGRhdGEpKSB7XG4gICAgb3V0W2tleV0gPSBkYXRhW2tleV0oKTtcbiAgfVxuXG4gIGxldCBpZENvbHVtbnMgPSBzY2hlbWEuaWQuY29sdW1ucztcblxuICBpZiAoXCJpZFwiIGluIGRhdGEpIHtcbiAgICBvdXQuaWQgPSBpZENvbHVtbnMubWFwKGNvbHVtbiA9PiBvdXRbY29sdW1uXSk7XG4gIH0gZWxzZSB7XG4gICAgb3V0LmlkID0gW2Ake0lEKyt9YF07XG4gIH1cblxuICByZXR1cm4gb3V0O1xufVxuIl19