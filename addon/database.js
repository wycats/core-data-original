import { INTERNAL_ROW, MultipleSelection, SingleSelection } from "./selection";
import Table, { EMPTY, SCHEMA } from "./table";
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
    populate(name, data, amount) {
        let table = this.get(name);
        let schema = table[SCHEMA];
        let out = [];
        for (let i = 0; i < amount; i++) {
            out.push(table.add(fake(data, schema)).entity);
        }
        return out;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWJhc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkYXRhYmFzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsWUFBWSxFQUFFLGlCQUFpQixFQUFFLGVBQWUsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUMvRSxPQUFPLEtBQUssRUFBRSxFQUVaLEtBQUssRUFHTCxNQUFNLEVBRVAsTUFBTSxTQUFTLENBQUM7QUFDakIsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLFNBQVMsQ0FBQztBQU1qQyxNQUFNLENBQUMsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBTW5DLE1BQU0sQ0FBQyxPQUFPLE9BQU8sUUFBUTtJQU8zQixZQUFvQixNQUFnRDtRQUYzRCxXQUFNLEdBQUcsSUFBSSxHQUFHLEVBQXVDLENBQUM7UUFHL0QsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7SUFDdkIsQ0FBQztJQVJELE1BQU0sQ0FBQyxNQUFNO1FBQ1gsT0FBTyxJQUFJLFFBQVEsQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDLENBQUM7SUFDakMsQ0FBQztJQVFELE1BQU0sQ0FBNkIsSUFBTyxFQUFFLE1BQWM7UUFDeEQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLElBQUksS0FBSyxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ2pELENBQUM7SUFFRCxLQUFLO1FBQ0gsSUFBSSxNQUFNLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUV2QixLQUFLLElBQUksQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNwQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQ2pDO1FBRUQsT0FBTyxJQUFJLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztJ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QUFHLE1BQU0sQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDO0lBRWxDLElBQUksSUFBSSxJQUFJLElBQUksRUFBRTtRQUNoQixHQUFHLENBQUMsRUFBRSxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztLQUMvQztTQUFNO1FBQ0wsR0FBRyxDQUFDLEVBQUUsR0FBRyxDQUFDLEdBQUcsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0tBQ3RCO0lBRUQsT0FBTyxHQUFHLENBQUM7QUFDYixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFNjaGVtYSBmcm9tIFwiLi9zY2hlbWFcIjtcbmltcG9ydCB7IElOVEVSTkFMX1JPVywgTXVsdGlwbGVTZWxlY3Rpb24sIFNpbmdsZVNlbGVjdGlvbiB9IGZyb20gXCIuL3NlbGVjdGlvblwiO1xuaW1wb3J0IFRhYmxlLCB7XG4gIERhdGFWYWx1ZSxcbiAgRU1QVFksXG4gIEVudGl0eSxcbiAgSW50ZXJuYWxSb3csXG4gIFNDSEVNQSxcbiAgU3BlY2lmaWVkUm93XG59IGZyb20gXCIuL3RhYmxlXCI7XG5pbXBvcnQgeyBleHBlY3QgfSBmcm9tIFwiLi91dGlsc1wiO1xuXG5pbnRlcmZhY2UgRmFrZURhdGEge1xuICBba2V5OiBzdHJpbmddOiAoKSA9PiB1bmtub3duO1xufVxuXG5leHBvcnQgY29uc3QgRklORCA9IFN5bWJvbChcIkZJTkRcIik7XG5cbmV4cG9ydCBpbnRlcmZhY2UgVHlwZXMge1xuICAvLyBba2V5OiBzdHJpbmddOiBUeXBlPFR5cGVzPjtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGF0YWJhc2U8VCBleHRlbmRzIFR5cGVzPiB7XG4gIHN0YXRpYyBjcmVhdGU8VCBleHRlbmRzIFR5cGVzPigpOiBEYXRhYmFzZTxUPiB7XG4gICAgcmV0dXJuIG5ldyBEYXRhYmFzZShuZXcgTWFwKCkpO1xuICB9XG5cbiAgcmVhZG9ubHkgdGFibGVzID0gbmV3IE1hcDxrZXlvZiBULCBUYWJsZTxULCBrZXlvZiBUICYgc3RyaW5nPj4oKTtcblxuICBwcml2YXRlIGNvbnN0cnVjdG9yKHRhYmxlczogTWFwPGtleW9mIFQsIFRhYmxlPFQsIGtleW9mIFQgJiBzdHJpbmc+Pikge1xuICAgIHRoaXMudGFibGVzID0gdGFibGVzO1xuICB9XG5cbiAgZGVmaW5lPE4gZXh0ZW5kcyBrZXlvZiBUICYgc3RyaW5nPihuYW1lOiBOLCBzY2hlbWE6IFNjaGVtYSkge1xuICAgIHRoaXMudGFibGVzLnNldChuYW1lLCBuZXcgVGFibGUobmFtZSwgc2NoZW1hKSk7XG4gIH1cblxuICBlbXB0eSgpOiBEYXRhYmFzZTxUPiB7XG4gICAgbGV0IHRhYmxlcyA9IG5ldyBNYXAoKTtcblxuICAgIGZvciAobGV0IFtrZXksIHRhYmxlXSBvZiB0aGlzLnRhYmxlcykge1xuICAgICAgdGFibGVzLnNldChrZXksIHRhYmxlW0VNUFRZXSgpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IERhdGFiYXNlKHRhYmxlcyk7XG4gIH1cblxuICBbRklORF08TiBleHRlbmRzIGtleW9mIFQgJiBzdHJpbmc+KGVudGl0eTogRW50aXR5PE4+KTogSW50ZXJuYWxSb3c8VCwgTj4ge1xuICAgIGxldCB0YWJsZTogVGFibGU8VCwgTj4gPSB0aGlzLmdldChlbnRpdHkudGFibGUpO1xuICAgIHJldHVybiB0YWJsZS5nZXQoZW50aXR5LmlkKTtcbiAgfVxuXG4gIGZpcnN0PE4gZXh0ZW5kcyBrZXlvZiBUICYgc3RyaW5nPihuYW1lOiBOKTogU2luZ2xlU2VsZWN0aW9uPFQsIE4+IHtcbiAgICBsZXQgdGFibGUgPSB0aGlzLmdldChuYW1lKTtcbiAgICByZXR1cm4gbmV3IFNpbmdsZVNlbGVjdGlvbih0aGlzLCB0YWJsZS5maXJzdCgpKTtcbiAgfVxuXG4gIGFsbDxOIGV4dGVuZHMga2V5b2YgVCAmIHN0cmluZz4obmFtZTogTiAmIGtleW9mIFQpOiBNdWx0aXBsZVNlbGVjdGlvbjxULCBOPiB7XG4gICAgcmV0dXJuIG5ldyBNdWx0aXBsZVNlbGVjdGlvbih0aGlzLCBuYW1lKTtcbiAgfVxuXG4gIGZpbmQ8TiBleHRlbmRzIGtleW9mIFQgJiBzdHJpbmc+KG5hbWU6IE4sIGlkOiBzdHJpbmcpOiBTaW5nbGVTZWxlY3Rpb248VCwgTj47XG4gIGZpbmQ8TiBleHRlbmRzIGtleW9mIFQgJiBzdHJpbmc+KGVudGl0eTogRW50aXR5PE4+KTogU2luZ2xlU2VsZWN0aW9uPFQsIE4+O1xuICBmaW5kPE4gZXh0ZW5kcyBrZXlvZiBUICYgc3RyaW5nPihcbiAgICBuYW1lT3JFbnRpdHk6IE4gfCBFbnRpdHk8Tj4sXG4gICAgaWQ/OiBzdHJpbmdcbiAgKTogU2luZ2xlU2VsZWN0aW9uPFQsIE4+IHtcbiAgICBpZiAodHlwZW9mIG5hbWVPckVudGl0eSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgdGhpcy5nZXQobmFtZU9yRW50aXR5KTtcblxuICAgICAgcmV0dXJuIG5ldyBTaW5nbGVTZWxlY3Rpb24odGhpcywge1xuICAgICAgICB0YWJsZTogbmFtZU9yRW50aXR5LFxuICAgICAgICBpZDogW2lkIGFzIHN0cmluZ11cbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmdldChuYW1lT3JFbnRpdHkudGFibGUpO1xuXG4gICAgICByZXR1cm4gbmV3IFNpbmdsZVNlbGVjdGlvbih0aGlzLCB7XG4gICAgICAgIHRhYmxlOiBuYW1lT3JFbnRpdHkudGFibGUsXG4gICAgICAgIGlkOiBuYW1lT3JFbnRpdHkuaWRcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGdldDxOIGV4dGVuZHMga2V5b2YgVCAmIHN0cmluZz4obmFtZTogTik6IFRhYmxlPFQsIE4+IHtcbiAgICBsZXQgdGFibGUgPSB0aGlzLnRhYmxlcy5nZXQobmFtZSk7XG4gICAgZXhwZWN0KHRhYmxlLCBgVW5leHBlY3RlZCB0YWJsZSBuYW1lICR7bmFtZX1gKTtcbiAgICByZXR1cm4gdGFibGUgYXMgVGFibGU8VCwgTj47XG4gIH1cblxuICB1cGRhdGU8TiBleHRlbmRzIGtleW9mIFQgJiBzdHJpbmc+KFxuICAgIGVudGl0eTogRW50aXR5PE4+LFxuICAgIHVwZGF0ZXM6IHsgW2tleTogc3RyaW5nXTogRGF0YVZhbHVlPFQ+IH1cbiAgKSB7XG4gICAgbGV0IHJvdyA9IHRoaXMuZmluZChlbnRpdHkpO1xuICAgIHJvd1tJTlRFUk5BTF9ST1ddLnVwZGF0ZSh1cGRhdGVzKTtcbiAgfVxuXG4gIHBvcHVsYXRlPE4gZXh0ZW5kcyBrZXlvZiBUICYgc3RyaW5nPihcbiAgICBuYW1lOiBOLFxuICAgIGRhdGE6IEZha2VEYXRhLFxuICAgIGFtb3VudDogbnVtYmVyXG4gICk6IEVudGl0eTxOPltdIHtcbiAgICBsZXQgdGFibGUgPSB0aGlzLmdldChuYW1lKTtcbiAgICBsZXQgc2NoZW1hID0gdGFibGVbU0NIRU1BXTtcblxuICAgIGxldCBvdXQ6IEVudGl0eTxOPltdID0gW107XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFtb3VudDsgaSsrKSB7XG4gICAgICBvdXQucHVzaCh0YWJsZS5hZGQoZmFrZShkYXRhLCBzY2hlbWEpKS5lbnRpdHkpO1xuICAgIH1cblxuICAgIHJldHVybiBvdXQ7XG4gIH1cbn1cblxubGV0IElEID0gMTtcblxuZnVuY3Rpb24gZmFrZTxUIGV4dGVuZHMgVHlwZXMsIE4gZXh0ZW5kcyBrZXlvZiBUICYgc3RyaW5nPihcbiAgZGF0YTogRmFrZURhdGEsXG4gIHNjaGVtYTogU2NoZW1hXG4pOiBTcGVjaWZpZWRSb3c8VCwgTj4ge1xuICBsZXQgb3V0ID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcblxuICBmb3IgKGxldCBrZXkgb2YgT2JqZWN0LmtleXMoZGF0YSkpIHtcbiAgICBvdXRba2V5XSA9IGRhdGFba2V5XSgpO1xuICB9XG5cbiAgbGV0IGlkQ29sdW1ucyA9IHNjaGVtYS5pZC5jb2x1bW5zO1xuXG4gIGlmIChcImlkXCIgaW4gZGF0YSkge1xuICAgIG91dC5pZCA9IGlkQ29sdW1ucy5tYXAoY29sdW1uID0+IG91dFtjb2x1bW5dKTtcbiAgfSBlbHNlIHtcbiAgICBvdXQuaWQgPSBbYCR7SUQrK31gXTtcbiAgfVxuXG4gIHJldHVybiBvdXQ7XG59XG4iXX0=