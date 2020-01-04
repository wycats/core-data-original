import { TrackedMap } from "tracked-built-ins";
export default class PrimaryKeyMap {
    constructor() {
        this.map = new TrackedMap();
    }
    entry(key) {
        if (key.length === 1) {
            return { map: this.map, key: key[0] };
        }
        let current = this.map;
        let head = key.slice(0, -1);
        let tail = key.slice(-1)[0];
        for (let part of head) {
            if (current.has(part)) {
                let next = current.get(part);
                if (next instanceof TrackedMap) {
                    current = next;
                }
                else {
                    // we're looking for something like `(foo, bar)` but the composite
                    // key for this table is more than two long
                    return;
                }
            }
            else {
                current = new TrackedMap();
            }
        }
        let next = current.get(tail);
        if (next instanceof TrackedMap) {
            return;
        }
        else {
            return { map: current, key: tail };
        }
    }
    get(key) {
        let entry = this.entry(key);
        if (entry === undefined) {
            return undefined;
        }
        else {
            return entry.map.get(entry.key);
        }
    }
    set(key, value) {
        let entry = this.entry(key);
        if (entry === undefined) {
            return;
        }
        else {
            entry.map.set(entry.key, value);
        }
    }
    keys() {
        return keys(this.map);
    }
    values() {
        return values(this.map);
    }
}
function keys(map, stack = []) {
    let out = [];
    for (let [key, value] of map.entries()) {
        if (value instanceof TrackedMap) {
            out.push(...keys(value, [...stack, key]));
        }
        else {
            out.push([...stack, key]);
        }
    }
    return out;
}
function values(map) {
    let out = [];
    for (let value of map.values()) {
        if (value instanceof Map) {
            out.push(...values(value));
        }
        else {
            out.push(value);
        }
    }
    return out;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJpbWFyeS1rZXktbWFwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicHJpbWFyeS1rZXktbWFwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUkvQyxNQUFNLENBQUMsT0FBTyxPQUFPLGFBQWE7SUFBbEM7UUFDVSxRQUFHLEdBQWtCLElBQUksVUFBVSxFQUFFLENBQUM7SUFpRWhELENBQUM7SUEvRFMsS0FBSyxDQUNYLEdBQWU7UUFFZixJQUFJLEdBQUcsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1lBQ3BCLE9BQU8sRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFTLENBQUM7U0FDOUM7UUFFRCxJQUFJLE9BQU8sR0FBa0IsSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUN0QyxJQUFJLElBQUksR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzVCLElBQUksSUFBSSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUU1QixLQUFLLElBQUksSUFBSSxJQUFJLElBQUksRUFBRTtZQUNyQixJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQ3JCLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBRTdCLElBQUksSUFBSSxZQUFZLFVBQVUsRUFBRTtvQkFDOUIsT0FBTyxHQUFHLElBQUksQ0FBQztpQkFDaEI7cUJBQU07b0JBQ0wsa0VBQWtFO29CQUNsRSwyQ0FBMkM7b0JBQzNDLE9BQU87aUJBQ1I7YUFDRjtpQkFBTTtnQkFDTCxPQUFPLEdBQUcsSUFBSSxVQUFVLEVBQUUsQ0FBQzthQUM1QjtTQUNGO1FBRUQsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUU3QixJQUFJLElBQUksWUFBWSxVQUFVLEVBQUU7WUFDOUIsT0FBTztTQUNSO2FBQU07WUFDTCxPQUFPLEVBQUUsR0FBRyxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFTLENBQUM7U0FDM0M7SUFDSCxDQUFDO0lBRUQsR0FBRyxDQUFDLEdBQWU7UUFDakIsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUU1QixJQUFJLEtBQUssS0FBSyxTQUFTLEVBQUU7WUFDdkIsT0FBTyxTQUFTLENBQUM7U0FDbEI7YUFBTTtZQUNMLE9BQU8sS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ2pDO0lBQ0gsQ0FBQztJQUVELEdBQUcsQ0FBQyxHQUFlLEVBQUUsS0FBUTtRQUMzQixJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRTVCLElBQUksS0FBSyxLQUFLLFNBQVMsRUFBRTtZQUN2QixPQUFPO1NBQ1I7YUFBTTtZQUNMLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDakM7SUFDSCxDQUFDO0lBRUQsSUFBSTtRQUNGLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN4QixDQUFDO0lBRUQsTUFBTTtRQUNKLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUMxQixDQUFDO0NBQ0Y7QUFFRCxTQUFTLElBQUksQ0FBQyxHQUF3QixFQUFFLFFBQW1CLEVBQUU7SUFDM0QsSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFDO0lBRWIsS0FBSyxJQUFJLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxJQUFJLEdBQUcsQ0FBQyxPQUFPLEVBQUUsRUFBRTtRQUN0QyxJQUFJLEtBQUssWUFBWSxVQUFVLEVBQUU7WUFDL0IsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxHQUFHLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDM0M7YUFBTTtZQUNMLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO1NBQzNCO0tBQ0Y7SUFFRCxPQUFPLEdBQUcsQ0FBQztBQUNiLENBQUM7QUFFRCxTQUFTLE1BQU0sQ0FBSSxHQUFrQjtJQUNuQyxJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUM7SUFFYixLQUFLLElBQUksS0FBSyxJQUFJLEdBQUcsQ0FBQyxNQUFNLEVBQUUsRUFBRTtRQUM5QixJQUFJLEtBQUssWUFBWSxHQUFHLEVBQUU7WUFDeEIsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1NBQzVCO2FBQU07WUFDTCxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ2pCO0tBQ0Y7SUFFRCxPQUFPLEdBQUcsQ0FBQztBQUNiLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQcmltYXJ5S2V5LCBJZFZhbHVlIH0gZnJvbSBcIi4vdGFibGVcIjtcbmltcG9ydCB7IFRyYWNrZWRNYXAgfSBmcm9tIFwidHJhY2tlZC1idWlsdC1pbnNcIjtcblxudHlwZSBQcml2YXRlTWFwPFQ+ID0gTWFwPElkVmFsdWUsIFQgfCBQcml2YXRlTWFwPFQ+PjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJpbWFyeUtleU1hcDxUPiB7XG4gIHByaXZhdGUgbWFwOiBQcml2YXRlTWFwPFQ+ID0gbmV3IFRyYWNrZWRNYXAoKTtcblxuICBwcml2YXRlIGVudHJ5KFxuICAgIGtleTogUHJpbWFyeUtleVxuICApOiB7IG1hcDogTWFwPElkVmFsdWUsIFQ+OyBrZXk6IElkVmFsdWUgfSB8IHVuZGVmaW5lZCB7XG4gICAgaWYgKGtleS5sZW5ndGggPT09IDEpIHtcbiAgICAgIHJldHVybiB7IG1hcDogdGhpcy5tYXAsIGtleToga2V5WzBdIH0gYXMgYW55O1xuICAgIH1cblxuICAgIGxldCBjdXJyZW50OiBQcml2YXRlTWFwPFQ+ID0gdGhpcy5tYXA7XG4gICAgbGV0IGhlYWQgPSBrZXkuc2xpY2UoMCwgLTEpO1xuICAgIGxldCB0YWlsID0ga2V5LnNsaWNlKC0xKVswXTtcblxuICAgIGZvciAobGV0IHBhcnQgb2YgaGVhZCkge1xuICAgICAgaWYgKGN1cnJlbnQuaGFzKHBhcnQpKSB7XG4gICAgICAgIGxldCBuZXh0ID0gY3VycmVudC5nZXQocGFydCk7XG5cbiAgICAgICAgaWYgKG5leHQgaW5zdGFuY2VvZiBUcmFja2VkTWFwKSB7XG4gICAgICAgICAgY3VycmVudCA9IG5leHQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gd2UncmUgbG9va2luZyBmb3Igc29tZXRoaW5nIGxpa2UgYChmb28sIGJhcilgIGJ1dCB0aGUgY29tcG9zaXRlXG4gICAgICAgICAgLy8ga2V5IGZvciB0aGlzIHRhYmxlIGlzIG1vcmUgdGhhbiB0d28gbG9uZ1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY3VycmVudCA9IG5ldyBUcmFja2VkTWFwKCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGV0IG5leHQgPSBjdXJyZW50LmdldCh0YWlsKTtcblxuICAgIGlmIChuZXh0IGluc3RhbmNlb2YgVHJhY2tlZE1hcCkge1xuICAgICAgcmV0dXJuO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4geyBtYXA6IGN1cnJlbnQsIGtleTogdGFpbCB9IGFzIGFueTtcbiAgICB9XG4gIH1cblxuICBnZXQoa2V5OiBQcmltYXJ5S2V5KTogVCB8IHVuZGVmaW5lZCB7XG4gICAgbGV0IGVudHJ5ID0gdGhpcy5lbnRyeShrZXkpO1xuXG4gICAgaWYgKGVudHJ5ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBlbnRyeS5tYXAuZ2V0KGVudHJ5LmtleSk7XG4gICAgfVxuICB9XG5cbiAgc2V0KGtleTogUHJpbWFyeUtleSwgdmFsdWU6IFQpOiB2b2lkIHtcbiAgICBsZXQgZW50cnkgPSB0aGlzLmVudHJ5KGtleSk7XG5cbiAgICBpZiAoZW50cnkgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH0gZWxzZSB7XG4gICAgICBlbnRyeS5tYXAuc2V0KGVudHJ5LmtleSwgdmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIGtleXMoKTogSXRlcmFibGU8SWRWYWx1ZVtdPiB7XG4gICAgcmV0dXJuIGtleXModGhpcy5tYXApO1xuICB9XG5cbiAgdmFsdWVzKCk6IEl0ZXJhYmxlPFQ+IHtcbiAgICByZXR1cm4gdmFsdWVzKHRoaXMubWFwKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBrZXlzKG1hcDogUHJpdmF0ZU1hcDx1bmtub3duPiwgc3RhY2s6IElkVmFsdWVbXSA9IFtdKTogUHJpbWFyeUtleVtdIHtcbiAgbGV0IG91dCA9IFtdO1xuXG4gIGZvciAobGV0IFtrZXksIHZhbHVlXSBvZiBtYXAuZW50cmllcygpKSB7XG4gICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgVHJhY2tlZE1hcCkge1xuICAgICAgb3V0LnB1c2goLi4ua2V5cyh2YWx1ZSwgWy4uLnN0YWNrLCBrZXldKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG91dC5wdXNoKFsuLi5zdGFjaywga2V5XSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG91dDtcbn1cblxuZnVuY3Rpb24gdmFsdWVzPFQ+KG1hcDogUHJpdmF0ZU1hcDxUPik6IFRbXSB7XG4gIGxldCBvdXQgPSBbXTtcblxuICBmb3IgKGxldCB2YWx1ZSBvZiBtYXAudmFsdWVzKCkpIHtcbiAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBNYXApIHtcbiAgICAgIG91dC5wdXNoKC4uLnZhbHVlcyh2YWx1ZSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBvdXQucHVzaCh2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG91dDtcbn1cbiJdfQ==