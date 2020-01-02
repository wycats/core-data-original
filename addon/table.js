var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { assert } from "./utils";
import { SingleSelection, ENTITY } from "./selection";
import { tracked } from "@glimmer/tracking";
import PrimaryKeyMap from "./primary-key-map";
export function isDataMatch(left, right) {
    if (isEntity(left) && isEntity(right)) {
        return left.table === right.table && isIdMatch(left.id, right.id);
    }
    else if (isEntity(left) || isEntity(right)) {
        return false;
    }
    else {
        return left === right;
    }
}
export function isIdMatch(left, right) {
    if (left.length !== right.length) {
        return false;
    }
    for (let i = 0; i < left.length; i++) {
        if (left[i] !== right[i]) {
            return false;
        }
    }
    return true;
}
export function isEntity(data) {
    return data !== null && typeof data === "object" && "table" in data;
}
export function normalizeDataType(data) {
    if (data instanceof SingleSelection) {
        return data[ENTITY];
    }
    else {
        return data;
    }
}
export class InternalRow {
    constructor(entity, columnNames, columns) {
        this.entity = entity;
        this.columnNames = columnNames;
        this.columns = columns;
    }
    static create(entity, row) {
        // TODO: Share column names
        let columnNames = Object.keys(row);
        let columns = Object.values(row).map(v => normalizeDataType(v));
        return new InternalRow(entity, columnNames, columns);
    }
    get id() {
        return this.entity.id;
    }
    update(updates) {
        for (let i = 0; i < this.columnNames.length; i++) {
            let columnName = this.columnNames[i];
            if (columnName in updates) {
                this.columns[i] = updates[columnName];
            }
        }
        // hack: invalidate columns
        this.columns = this.columns;
    }
    select(columns) {
        let out = Object.create(null);
        for (let column of columns) {
            out[column] = this.getColumn(column);
        }
        return out;
    }
    getColumn(name) {
        let index = this.columnIndex(name);
        return this.columns[index];
    }
    columnIndex(name) {
        let index = this.columnNames.indexOf(name);
        assert(index > -1, `You tried to match column ${name} in table ${this.entity.table} but it didn't exist (columns: ${this.columnNames.join(", ")})`);
        return index;
    }
    isMatch(query) {
        for (let key of Object.keys(query)) {
            let index = this.columnIndex(key);
            let pattern = query[key];
            let value = this.columns[index];
            if (!isDataMatch(pattern, value)) {
                return false;
            }
        }
        return true;
    }
}
__decorate([
    tracked
], InternalRow.prototype, "columns", void 0);
export const EMPTY = Symbol("EMPTY");
export const FILTER = Symbol("FILTER");
export const ADD_ROW = Symbol("ADD_ROW");
export const SCHEMA = Symbol("SCHEMA");
export default class Table {
    constructor(name, schema) {
        this.name = name;
        this.schema = schema;
        this.map = new PrimaryKeyMap();
    }
    get [SCHEMA]() {
        return this.schema;
    }
    [EMPTY]() {
        return new Table(this.name, this.schema);
    }
    [FILTER](query) {
        let out = [];
        for (let row of this.map.values()) {
            if (row.isMatch(query)) {
                out.push(row.entity);
            }
        }
        return out;
    }
    [ADD_ROW](row) {
        this.map.set(row.id, row);
        return {
            table: this.name,
            id: row.id
        };
    }
    all() {
        let out = [];
        for (let row of this.map.values()) {
            out.push({ table: this.name, id: row.id });
        }
        return out;
    }
    first() {
        for (let key of this.map.keys()) {
            return { table: this.name, id: key };
        }
        throw new Error(`Called first() on an empty database`);
    }
    get(id) {
        let row = this.map.get(id);
        assert(row, `Row not found (${id})`);
        return row;
    }
    add(row) {
        let userRow = InternalRow.create({ table: this.name, id: Array.isArray(row.id) ? row.id : [row.id] }, row);
        this[ADD_ROW](userRow);
        return userRow;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0YWJsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFDQSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sU0FBUyxDQUFDO0FBQ2pDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxFQUFTLE1BQU0sYUFBYSxDQUFDO0FBQzdELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUM1QyxPQUFPLGFBQWEsTUFBTSxtQkFBbUIsQ0FBQztBQW9COUMsTUFBTSxVQUFVLFdBQVcsQ0FDekIsSUFBa0IsRUFDbEIsS0FBbUI7SUFFbkIsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFO1FBQ3JDLE9BQU8sSUFBSSxDQUFDLEtBQUssS0FBSyxLQUFLLENBQUMsS0FBSyxJQUFJLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztLQUNuRTtTQUFNLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBRTtRQUM1QyxPQUFPLEtBQUssQ0FBQztLQUNkO1NBQU07UUFDTCxPQUFPLElBQUksS0FBSyxLQUFLLENBQUM7S0FDdkI7QUFDSCxDQUFDO0FBRUQsTUFBTSxVQUFVLFNBQVMsQ0FBQyxJQUFnQixFQUFFLEtBQWlCO0lBQzNELElBQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxLQUFLLENBQUMsTUFBTSxFQUFFO1FBQ2hDLE9BQU8sS0FBSyxDQUFDO0tBQ2Q7SUFFRCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUNwQyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDeEIsT0FBTyxLQUFLLENBQUM7U0FDZDtLQUNGO0lBRUQsT0FBTyxJQUFJLENBQUM7QUFDZCxDQUFDO0FBRUQsTUFBTSxVQUFVLFFBQVEsQ0FDdEIsSUFBa0I7SUFFbEIsT0FBTyxJQUFJLEtBQUssSUFBSSxJQUFJLE9BQU8sSUFBSSxLQUFLLFFBQVEsSUFBSSxPQUFPLElBQUksSUFBSSxDQUFDO0FBQ3RFLENBQUM7QUFFRCxNQUFNLFVBQVUsaUJBQWlCLENBQy9CLElBQTZCO0lBRTdCLElBQUksSUFBSSxZQUFZLGVBQWUsRUFBRTtRQUNuQyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUNyQjtTQUFNO1FBQ0wsT0FBTyxJQUFJLENBQUM7S0FDYjtBQUNILENBQUM7QUFFRCxNQUFNLE9BQU8sV0FBVztJQWN0QixZQUNXLE1BQWlCLEVBQ2xCLFdBQXFCLEVBQzdCLE9BQTRCO1FBRm5CLFdBQU0sR0FBTixNQUFNLENBQVc7UUFDbEIsZ0JBQVcsR0FBWCxXQUFXLENBQVU7UUFHN0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7SUFDekIsQ0FBQztJQW5CRCxNQUFNLENBQUMsTUFBTSxDQUNYLE1BQWlCLEVBQ2pCLEdBQStDO1FBRS9DLDJCQUEyQjtRQUMzQixJQUFJLFdBQVcsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ25DLElBQUksT0FBTyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVoRSxPQUFPLElBQUksV0FBVyxDQUFDLE1BQU0sRUFBRSxXQUFXLEVBQUUsT0FBTyxDQUFzQixDQUFDO0lBQzVFLENBQUM7SUFZRCxJQUFJLEVBQUU7UUFDSixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUFFRCxNQUFNLENBQUMsT0FBd0M7UUFDN0MsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ2hELElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFckMsSUFBSSxVQUFVLElBQUksT0FBTyxFQUFFO2dCQUN6QixJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQzthQUN2QztTQUNGO1FBRUQsMkJBQTJCO1FBQzNCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUM5QixDQUFDO0lBRUQsTUFBTSxDQUNKLE9BQXFCO1FBRXJCLElBQUksR0FBRyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFOUIsS0FBSyxJQUFJLE1BQU0sSUFBSSxPQUFPLEVBQUU7WUFDMUIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDdEM7UUFFRCxPQUFPLEdBQUcsQ0FBQztJQUNiLENBQUM7SUFFTyxTQUFTLENBQWdDLElBQU87UUFDdEQsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNuQyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUVPLFdBQVcsQ0FBZ0MsSUFBTztRQUN4RCxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUUzQyxNQUFNLENBQ0osS0FBSyxHQUFHLENBQUMsQ0FBQyxFQUNWLDZCQUE2QixJQUFJLGFBQy9CLElBQUksQ0FBQyxNQUFNLENBQUMsS0FDZCxrQ0FBa0MsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FDakUsQ0FBQztRQUVGLE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQUVELE9BQU8sQ0FBQyxLQUFrQjtRQUN4QixLQUFLLElBQUksR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDbEMsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFVLENBQUMsQ0FBQztZQUV6QyxJQUFJLE9BQU8sR0FBSSxLQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDbEMsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUVoQyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsRUFBRTtnQkFDaEMsT0FBTyxLQUFLLENBQUM7YUFDZDtTQUNGO1FBRUQsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0NBQ0Y7QUF2RVU7SUFBUixPQUFPOzRDQUE4QjtBQXNGeEMsTUFBTSxDQUFDLE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUNyQyxNQUFNLENBQUMsTUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ3ZDLE1BQU0sQ0FBQyxNQUFNLE9BQU8sR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDekMsTUFBTSxDQUFDLE1BQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztBQVV2QyxNQUFNLENBQUMsT0FBTyxPQUFPLEtBQUs7SUFHeEIsWUFBcUIsSUFBTyxFQUFVLE1BQWM7UUFBL0IsU0FBSSxHQUFKLElBQUksQ0FBRztRQUFVLFdBQU0sR0FBTixNQUFNLENBQVE7UUFGM0MsUUFBRyxHQUFHLElBQUksYUFBYSxFQUFxQixDQUFDO0lBRUMsQ0FBQztJQUV4RCxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ1YsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3JCLENBQUM7SUFFRCxDQUFDLEtBQUssQ0FBQztRQUNMLE9BQU8sSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUVELENBQUMsTUFBTSxDQUFDLENBQUMsS0FBa0I7UUFDekIsSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFDO1FBRWIsS0FBSyxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxFQUFFO1lBQ2pDLElBQUksR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtnQkFDdEIsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7YUFDdEI7U0FDRjtRQUVELE9BQU8sR0FBRyxDQUFDO0lBQ2IsQ0FBQztJQUVELENBQUMsT0FBTyxDQUFDLENBQUMsR0FBc0I7UUFDOUIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUUxQixPQUFPO1lBQ0wsS0FBSyxFQUFFLElBQUksQ0FBQyxJQUFJO1lBQ2hCLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFBRTtTQUNYLENBQUM7SUFDSixDQUFDO0lBRUQsR0FBRztRQUNELElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQztRQUViLEtBQUssSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsRUFBRTtZQUNqQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1NBQzVDO1FBRUQsT0FBTyxHQUFHLENBQUM7SUFDYixDQUFDO0lBRUQsS0FBSztRQUNILEtBQUssSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUMvQixPQUFPLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxDQUFDO1NBQ3RDO1FBRUQsTUFBTSxJQUFJLEtBQUssQ0FBQyxxQ0FBcUMsQ0FBQyxDQUFDO0lBQ3pELENBQUM7SUFFRCxHQUFHLENBQUMsRUFBYztRQUNoQixJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUMzQixNQUFNLENBQUMsR0FBRyxFQUFFLGtCQUFrQixFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ3JDLE9BQU8sR0FBRyxDQUFDO0lBQ2IsQ0FBQztJQUVELEdBQUcsQ0FBQyxHQUF1QjtRQUN6QixJQUFJLE9BQU8sR0FBRyxXQUFXLENBQUMsTUFBTSxDQUM5QixFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLEVBQUUsRUFBRSxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFDbkUsR0FBRyxDQUNKLENBQUM7UUFDRixJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDdkIsT0FBTyxPQUFPLENBQUM7SUFDakIsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFNjaGVtYSwgeyBJZFR5cGUgfSBmcm9tIFwiLi9zY2hlbWFcIjtcbmltcG9ydCB7IGFzc2VydCB9IGZyb20gXCIuL3V0aWxzXCI7XG5pbXBvcnQgeyBTaW5nbGVTZWxlY3Rpb24sIEVOVElUWSwgUXVlcnkgfSBmcm9tIFwiLi9zZWxlY3Rpb25cIjtcbmltcG9ydCB7IHRyYWNrZWQgfSBmcm9tIFwiQGdsaW1tZXIvdHJhY2tpbmdcIjtcbmltcG9ydCBQcmltYXJ5S2V5TWFwIGZyb20gXCIuL3ByaW1hcnkta2V5LW1hcFwiO1xuaW1wb3J0IHsgVHlwZXMgfSBmcm9tIFwiLi9kYXRhYmFzZVwiO1xuXG5leHBvcnQgdHlwZSBTcGVjaWZpZWREYXRhVHlwZTxUIGV4dGVuZHMgVHlwZXMsIE4gZXh0ZW5kcyBrZXlvZiBUICYgc3RyaW5nPiA9XG4gIHwgc3RyaW5nXG4gIHwgbnVtYmVyXG4gIHwgYm9vbGVhblxuICB8IElkVHlwZVxuICB8IEVudGl0eTxOPlxuICB8IFNpbmdsZVNlbGVjdGlvbjxULCBOPjtcblxuZXhwb3J0IHR5cGUgSWRWYWx1ZSA9IHN0cmluZyB8IG51bWJlciB8IGJvb2xlYW47XG5leHBvcnQgdHlwZSBEYXRhVmFsdWU8VCBleHRlbmRzIFR5cGVzPiA9XG4gIHwgc3RyaW5nXG4gIHwgbnVtYmVyXG4gIHwgYm9vbGVhblxuICB8IG51bGxcbiAgfCBJZFR5cGVcbiAgfCBFbnRpdHk8a2V5b2YgVCAmIHN0cmluZz47XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0RhdGFNYXRjaDxUIGV4dGVuZHMgVHlwZXM+KFxuICBsZWZ0OiBEYXRhVmFsdWU8VD4sXG4gIHJpZ2h0OiBEYXRhVmFsdWU8VD5cbik6IGJvb2xlYW4ge1xuICBpZiAoaXNFbnRpdHkobGVmdCkgJiYgaXNFbnRpdHkocmlnaHQpKSB7XG4gICAgcmV0dXJuIGxlZnQudGFibGUgPT09IHJpZ2h0LnRhYmxlICYmIGlzSWRNYXRjaChsZWZ0LmlkLCByaWdodC5pZCk7XG4gIH0gZWxzZSBpZiAoaXNFbnRpdHkobGVmdCkgfHwgaXNFbnRpdHkocmlnaHQpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBsZWZ0ID09PSByaWdodDtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNJZE1hdGNoKGxlZnQ6IFByaW1hcnlLZXksIHJpZ2h0OiBQcmltYXJ5S2V5KTogYm9vbGVhbiB7XG4gIGlmIChsZWZ0Lmxlbmd0aCAhPT0gcmlnaHQubGVuZ3RoKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZWZ0Lmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKGxlZnRbaV0gIT09IHJpZ2h0W2ldKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0VudGl0eTxUIGV4dGVuZHMgVHlwZXMsIE4gZXh0ZW5kcyBrZXlvZiBUICYgc3RyaW5nPihcbiAgZGF0YTogRGF0YVZhbHVlPFQ+XG4pOiBkYXRhIGlzIEVudGl0eTxOPiB7XG4gIHJldHVybiBkYXRhICE9PSBudWxsICYmIHR5cGVvZiBkYXRhID09PSBcIm9iamVjdFwiICYmIFwidGFibGVcIiBpbiBkYXRhO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbm9ybWFsaXplRGF0YVR5cGU8VCBleHRlbmRzIFR5cGVzLCBOIGV4dGVuZHMga2V5b2YgVCAmIHN0cmluZz4oXG4gIGRhdGE6IFNwZWNpZmllZERhdGFUeXBlPFQsIE4+XG4pOiBEYXRhVmFsdWU8VD4ge1xuICBpZiAoZGF0YSBpbnN0YW5jZW9mIFNpbmdsZVNlbGVjdGlvbikge1xuICAgIHJldHVybiBkYXRhW0VOVElUWV07XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGRhdGE7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIEludGVybmFsUm93PFQgZXh0ZW5kcyBUeXBlcywgTiBleHRlbmRzIGtleW9mIFQgJiBzdHJpbmc+IHtcbiAgc3RhdGljIGNyZWF0ZTxUIGV4dGVuZHMgVHlwZXMsIE4gZXh0ZW5kcyBrZXlvZiBUICYgc3RyaW5nPihcbiAgICBlbnRpdHk6IEVudGl0eTxOPixcbiAgICByb3c6IHsgW2tleTogc3RyaW5nXTogU3BlY2lmaWVkRGF0YVR5cGU8VCwgTj4gfVxuICApOiBJbnRlcm5hbFJvdzxULCBOPiB7XG4gICAgLy8gVE9ETzogU2hhcmUgY29sdW1uIG5hbWVzXG4gICAgbGV0IGNvbHVtbk5hbWVzID0gT2JqZWN0LmtleXMocm93KTtcbiAgICBsZXQgY29sdW1ucyA9IE9iamVjdC52YWx1ZXMocm93KS5tYXAodiA9PiBub3JtYWxpemVEYXRhVHlwZSh2KSk7XG5cbiAgICByZXR1cm4gbmV3IEludGVybmFsUm93KGVudGl0eSwgY29sdW1uTmFtZXMsIGNvbHVtbnMpIGFzIEludGVybmFsUm93PFQsIE4+O1xuICB9XG5cbiAgQHRyYWNrZWQgY29sdW1uczogQXJyYXk8RGF0YVZhbHVlPFQ+PjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICByZWFkb25seSBlbnRpdHk6IEVudGl0eTxOPixcbiAgICBwcml2YXRlIGNvbHVtbk5hbWVzOiBzdHJpbmdbXSxcbiAgICBjb2x1bW5zOiBBcnJheTxEYXRhVmFsdWU8VD4+XG4gICkge1xuICAgIHRoaXMuY29sdW1ucyA9IGNvbHVtbnM7XG4gIH1cblxuICBnZXQgaWQoKTogUHJpbWFyeUtleSB7XG4gICAgcmV0dXJuIHRoaXMuZW50aXR5LmlkO1xuICB9XG5cbiAgdXBkYXRlKHVwZGF0ZXM6IHsgW2tleTogc3RyaW5nXTogRGF0YVZhbHVlPFQ+IH0pOiB2b2lkIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuY29sdW1uTmFtZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCBjb2x1bW5OYW1lID0gdGhpcy5jb2x1bW5OYW1lc1tpXTtcblxuICAgICAgaWYgKGNvbHVtbk5hbWUgaW4gdXBkYXRlcykge1xuICAgICAgICB0aGlzLmNvbHVtbnNbaV0gPSB1cGRhdGVzW2NvbHVtbk5hbWVdO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIGhhY2s6IGludmFsaWRhdGUgY29sdW1uc1xuICAgIHRoaXMuY29sdW1ucyA9IHRoaXMuY29sdW1ucztcbiAgfVxuXG4gIHNlbGVjdDxLIGV4dGVuZHMga2V5b2YgVFtOXSAmIHN0cmluZz4oXG4gICAgY29sdW1uczogcmVhZG9ubHkgS1tdXG4gICk6IHsgW1AgaW4gS106IFRbTl1bS10gfSB7XG4gICAgbGV0IG91dCA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG5cbiAgICBmb3IgKGxldCBjb2x1bW4gb2YgY29sdW1ucykge1xuICAgICAgb3V0W2NvbHVtbl0gPSB0aGlzLmdldENvbHVtbihjb2x1bW4pO1xuICAgIH1cblxuICAgIHJldHVybiBvdXQ7XG4gIH1cblxuICBwcml2YXRlIGdldENvbHVtbjxLIGV4dGVuZHMga2V5b2YgVFtOXSAmIHN0cmluZz4obmFtZTogSyk6IHVua25vd24ge1xuICAgIGxldCBpbmRleCA9IHRoaXMuY29sdW1uSW5kZXgobmFtZSk7XG4gICAgcmV0dXJuIHRoaXMuY29sdW1uc1tpbmRleF07XG4gIH1cblxuICBwcml2YXRlIGNvbHVtbkluZGV4PEsgZXh0ZW5kcyBrZXlvZiBUW05dICYgc3RyaW5nPihuYW1lOiBLKTogbnVtYmVyIHtcbiAgICBsZXQgaW5kZXggPSB0aGlzLmNvbHVtbk5hbWVzLmluZGV4T2YobmFtZSk7XG5cbiAgICBhc3NlcnQoXG4gICAgICBpbmRleCA+IC0xLFxuICAgICAgYFlvdSB0cmllZCB0byBtYXRjaCBjb2x1bW4gJHtuYW1lfSBpbiB0YWJsZSAke1xuICAgICAgICB0aGlzLmVudGl0eS50YWJsZVxuICAgICAgfSBidXQgaXQgZGlkbid0IGV4aXN0IChjb2x1bW5zOiAke3RoaXMuY29sdW1uTmFtZXMuam9pbihcIiwgXCIpfSlgXG4gICAgKTtcblxuICAgIHJldHVybiBpbmRleDtcbiAgfVxuXG4gIGlzTWF0Y2gocXVlcnk6IFF1ZXJ5PFQsIE4+KTogYm9vbGVhbiB7XG4gICAgZm9yIChsZXQga2V5IG9mIE9iamVjdC5rZXlzKHF1ZXJ5KSkge1xuICAgICAgbGV0IGluZGV4ID0gdGhpcy5jb2x1bW5JbmRleChrZXkgYXMgYW55KTtcblxuICAgICAgbGV0IHBhdHRlcm4gPSAocXVlcnkgYXMgYW55KVtrZXldO1xuICAgICAgbGV0IHZhbHVlID0gdGhpcy5jb2x1bW5zW2luZGV4XTtcblxuICAgICAgaWYgKCFpc0RhdGFNYXRjaChwYXR0ZXJuLCB2YWx1ZSkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xuICB9XG59XG5cbmV4cG9ydCB0eXBlIFByaW1hcnlLZXkgPSBJZFZhbHVlW107XG5cbmV4cG9ydCBpbnRlcmZhY2UgRW50aXR5PFQgZXh0ZW5kcyBzdHJpbmc+IHtcbiAgdGFibGU6IFQ7XG4gIGlkOiBQcmltYXJ5S2V5O1xufVxuXG5leHBvcnQgdHlwZSBTcGVjaWZpZWRSb3c8VCBleHRlbmRzIFR5cGVzLCBOIGV4dGVuZHMga2V5b2YgVCAmIHN0cmluZz4gPSB7XG4gIGlkOiBQcmltYXJ5S2V5IHwgc3RyaW5nO1xufSAmIHtcbiAgW2tleTogc3RyaW5nXTogU3BlY2lmaWVkRGF0YVR5cGU8VCwgTj47XG59O1xuXG5leHBvcnQgY29uc3QgRU1QVFkgPSBTeW1ib2woXCJFTVBUWVwiKTtcbmV4cG9ydCBjb25zdCBGSUxURVIgPSBTeW1ib2woXCJGSUxURVJcIik7XG5leHBvcnQgY29uc3QgQUREX1JPVyA9IFN5bWJvbChcIkFERF9ST1dcIik7XG5leHBvcnQgY29uc3QgU0NIRU1BID0gU3ltYm9sKFwiU0NIRU1BXCIpO1xuXG5leHBvcnQgaW50ZXJmYWNlIFR5cGU8VCBleHRlbmRzIFR5cGVzPiB7XG4gIFtrZXk6IHN0cmluZ106IERhdGFWYWx1ZTxUPjtcbn1cblxuZXhwb3J0IHR5cGUgU3BlY2lmaWVkUXVlcnk8VCBleHRlbmRzIFR5cGVzLCBLIGV4dGVuZHMga2V5b2YgVD4gPSB7XG4gIFtQIGluIGtleW9mIFRbS11dPzogVFtLXVtQXTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRhYmxlPFQgZXh0ZW5kcyBUeXBlcywgTiBleHRlbmRzIGtleW9mIFQgJiBzdHJpbmc+IHtcbiAgcmVhZG9ubHkgbWFwID0gbmV3IFByaW1hcnlLZXlNYXA8SW50ZXJuYWxSb3c8VCwgTj4+KCk7XG5cbiAgY29uc3RydWN0b3IocmVhZG9ubHkgbmFtZTogTiwgcHJpdmF0ZSBzY2hlbWE6IFNjaGVtYSkge31cblxuICBnZXQgW1NDSEVNQV0oKTogU2NoZW1hIHtcbiAgICByZXR1cm4gdGhpcy5zY2hlbWE7XG4gIH1cblxuICBbRU1QVFldKCk6IFRhYmxlPFQsIE4+IHtcbiAgICByZXR1cm4gbmV3IFRhYmxlKHRoaXMubmFtZSwgdGhpcy5zY2hlbWEpO1xuICB9XG5cbiAgW0ZJTFRFUl0ocXVlcnk6IFF1ZXJ5PFQsIE4+KTogUmVhZG9ubHlBcnJheTxFbnRpdHk8Tj4+IHtcbiAgICBsZXQgb3V0ID0gW107XG5cbiAgICBmb3IgKGxldCByb3cgb2YgdGhpcy5tYXAudmFsdWVzKCkpIHtcbiAgICAgIGlmIChyb3cuaXNNYXRjaChxdWVyeSkpIHtcbiAgICAgICAgb3V0LnB1c2gocm93LmVudGl0eSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG91dDtcbiAgfVxuXG4gIFtBRERfUk9XXShyb3c6IEludGVybmFsUm93PFQsIE4+KTogRW50aXR5PE4+IHtcbiAgICB0aGlzLm1hcC5zZXQocm93LmlkLCByb3cpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIHRhYmxlOiB0aGlzLm5hbWUsXG4gICAgICBpZDogcm93LmlkXG4gICAgfTtcbiAgfVxuXG4gIGFsbCgpOiBSZWFkb25seUFycmF5PEVudGl0eTxOPj4ge1xuICAgIGxldCBvdXQgPSBbXTtcblxuICAgIGZvciAobGV0IHJvdyBvZiB0aGlzLm1hcC52YWx1ZXMoKSkge1xuICAgICAgb3V0LnB1c2goeyB0YWJsZTogdGhpcy5uYW1lLCBpZDogcm93LmlkIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBvdXQ7XG4gIH1cblxuICBmaXJzdCgpOiBFbnRpdHk8Tj4ge1xuICAgIGZvciAobGV0IGtleSBvZiB0aGlzLm1hcC5rZXlzKCkpIHtcbiAgICAgIHJldHVybiB7IHRhYmxlOiB0aGlzLm5hbWUsIGlkOiBrZXkgfTtcbiAgICB9XG5cbiAgICB0aHJvdyBuZXcgRXJyb3IoYENhbGxlZCBmaXJzdCgpIG9uIGFuIGVtcHR5IGRhdGFiYXNlYCk7XG4gIH1cblxuICBnZXQoaWQ6IFByaW1hcnlLZXkpOiBJbnRlcm5hbFJvdzxULCBOPiB7XG4gICAgbGV0IHJvdyA9IHRoaXMubWFwLmdldChpZCk7XG4gICAgYXNzZXJ0KHJvdywgYFJvdyBub3QgZm91bmQgKCR7aWR9KWApO1xuICAgIHJldHVybiByb3c7XG4gIH1cblxuICBhZGQocm93OiBTcGVjaWZpZWRSb3c8VCwgTj4pOiBJbnRlcm5hbFJvdzxULCBOPiB7XG4gICAgbGV0IHVzZXJSb3cgPSBJbnRlcm5hbFJvdy5jcmVhdGUoXG4gICAgICB7IHRhYmxlOiB0aGlzLm5hbWUsIGlkOiBBcnJheS5pc0FycmF5KHJvdy5pZCkgPyByb3cuaWQgOiBbcm93LmlkXSB9LFxuICAgICAgcm93XG4gICAgKTtcbiAgICB0aGlzW0FERF9ST1ddKHVzZXJSb3cpO1xuICAgIHJldHVybiB1c2VyUm93O1xuICB9XG59XG4iXX0=