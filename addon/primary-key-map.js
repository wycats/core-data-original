export default class PrimaryKeyMap {
    constructor() {
        this.map = new Map();
    }
    entry(key) {
        if (key.length === 1) {
            return { map: this.map, key: key[0] };
        }
        let current = this.map;
        let head = key.slice(0, -1);
        let tail = key.slice(-1)[0];
        for (let part of head) {
            let next = current.get(part);
            if (next instanceof Map) {
                current = next;
            }
            else {
                return;
            }
        }
        let next = current.get(tail);
        if (next instanceof Map) {
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
        if (value instanceof Map) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJpbWFyeS1rZXktbWFwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicHJpbWFyeS1rZXktbWFwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUlBLE1BQU0sQ0FBQyxPQUFPLE9BQU8sYUFBYTtJQUFsQztRQUNVLFFBQUcsR0FBa0IsSUFBSSxHQUFHLEVBQUUsQ0FBQztJQTJEekMsQ0FBQztJQXpEUyxLQUFLLENBQ1gsR0FBZTtRQUVmLElBQUksR0FBRyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDcEIsT0FBTyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQVMsQ0FBQztTQUM5QztRQUVELElBQUksT0FBTyxHQUFrQixJQUFJLENBQUMsR0FBRyxDQUFDO1FBQ3RDLElBQUksSUFBSSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDNUIsSUFBSSxJQUFJLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRTVCLEtBQUssSUFBSSxJQUFJLElBQUksSUFBSSxFQUFFO1lBQ3JCLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7WUFFN0IsSUFBSSxJQUFJLFlBQVksR0FBRyxFQUFFO2dCQUN2QixPQUFPLEdBQUcsSUFBSSxDQUFDO2FBQ2hCO2lCQUFNO2dCQUNMLE9BQU87YUFDUjtTQUNGO1FBRUQsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUU3QixJQUFJLElBQUksWUFBWSxHQUFHLEVBQUU7WUFDdkIsT0FBTztTQUNSO2FBQU07WUFDTCxPQUFPLEVBQUUsR0FBRyxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFTLENBQUM7U0FDM0M7SUFDSCxDQUFDO0lBRUQsR0FBRyxDQUFDLEdBQWU7UUFDakIsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUU1QixJQUFJLEtBQUssS0FBSyxTQUFTLEVBQUU7WUFDdkIsT0FBTyxTQUFTLENBQUM7U0FDbEI7YUFBTTtZQUNMLE9BQU8sS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ2pDO0lBQ0gsQ0FBQztJQUVELEdBQUcsQ0FBQyxHQUFlLEVBQUUsS0FBUTtRQUMzQixJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRTVCLElBQUksS0FBSyxLQUFLLFNBQVMsRUFBRTtZQUN2QixPQUFPO1NBQ1I7YUFBTTtZQUNMLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDakM7SUFDSCxDQUFDO0lBRUQsSUFBSTtRQUNGLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN4QixDQUFDO0lBRUQsTUFBTTtRQUNKLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUMxQixDQUFDO0NBQ0Y7QUFFRCxTQUFTLElBQUksQ0FBQyxHQUF3QixFQUFFLFFBQW1CLEVBQUU7SUFDM0QsSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFDO0lBRWIsS0FBSyxJQUFJLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxJQUFJLEdBQUcsQ0FBQyxPQUFPLEVBQUUsRUFBRTtRQUN0QyxJQUFJLEtBQUssWUFBWSxHQUFHLEVBQUU7WUFDeEIsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxHQUFHLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDM0M7YUFBTTtZQUNMLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO1NBQzNCO0tBQ0Y7SUFFRCxPQUFPLEdBQUcsQ0FBQztBQUNiLENBQUM7QUFFRCxTQUFTLE1BQU0sQ0FBSSxHQUFrQjtJQUNuQyxJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUM7SUFFYixLQUFLLElBQUksS0FBSyxJQUFJLEdBQUcsQ0FBQyxNQUFNLEVBQUUsRUFBRTtRQUM5QixJQUFJLEtBQUssWUFBWSxHQUFHLEVBQUU7WUFDeEIsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1NBQzVCO2FBQU07WUFDTCxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ2pCO0tBQ0Y7SUFFRCxPQUFPLEdBQUcsQ0FBQztBQUNiLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQcmltYXJ5S2V5LCBJZFZhbHVlIH0gZnJvbSBcIi4vdGFibGVcIjtcblxudHlwZSBQcml2YXRlTWFwPFQ+ID0gTWFwPElkVmFsdWUsIFQgfCBQcml2YXRlTWFwPFQ+PjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJpbWFyeUtleU1hcDxUPiB7XG4gIHByaXZhdGUgbWFwOiBQcml2YXRlTWFwPFQ+ID0gbmV3IE1hcCgpO1xuXG4gIHByaXZhdGUgZW50cnkoXG4gICAga2V5OiBQcmltYXJ5S2V5XG4gICk6IHsgbWFwOiBNYXA8SWRWYWx1ZSwgVD47IGtleTogSWRWYWx1ZSB9IHwgdW5kZWZpbmVkIHtcbiAgICBpZiAoa2V5Lmxlbmd0aCA9PT0gMSkge1xuICAgICAgcmV0dXJuIHsgbWFwOiB0aGlzLm1hcCwga2V5OiBrZXlbMF0gfSBhcyBhbnk7XG4gICAgfVxuXG4gICAgbGV0IGN1cnJlbnQ6IFByaXZhdGVNYXA8VD4gPSB0aGlzLm1hcDtcbiAgICBsZXQgaGVhZCA9IGtleS5zbGljZSgwLCAtMSk7XG4gICAgbGV0IHRhaWwgPSBrZXkuc2xpY2UoLTEpWzBdO1xuXG4gICAgZm9yIChsZXQgcGFydCBvZiBoZWFkKSB7XG4gICAgICBsZXQgbmV4dCA9IGN1cnJlbnQuZ2V0KHBhcnQpO1xuXG4gICAgICBpZiAobmV4dCBpbnN0YW5jZW9mIE1hcCkge1xuICAgICAgICBjdXJyZW50ID0gbmV4dDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsZXQgbmV4dCA9IGN1cnJlbnQuZ2V0KHRhaWwpO1xuXG4gICAgaWYgKG5leHQgaW5zdGFuY2VvZiBNYXApIHtcbiAgICAgIHJldHVybjtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHsgbWFwOiBjdXJyZW50LCBrZXk6IHRhaWwgfSBhcyBhbnk7XG4gICAgfVxuICB9XG5cbiAgZ2V0KGtleTogUHJpbWFyeUtleSk6IFQgfCB1bmRlZmluZWQge1xuICAgIGxldCBlbnRyeSA9IHRoaXMuZW50cnkoa2V5KTtcblxuICAgIGlmIChlbnRyeSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZW50cnkubWFwLmdldChlbnRyeS5rZXkpO1xuICAgIH1cbiAgfVxuXG4gIHNldChrZXk6IFByaW1hcnlLZXksIHZhbHVlOiBUKTogdm9pZCB7XG4gICAgbGV0IGVudHJ5ID0gdGhpcy5lbnRyeShrZXkpO1xuXG4gICAgaWYgKGVudHJ5ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9IGVsc2Uge1xuICAgICAgZW50cnkubWFwLnNldChlbnRyeS5rZXksIHZhbHVlKTtcbiAgICB9XG4gIH1cblxuICBrZXlzKCk6IEl0ZXJhYmxlPElkVmFsdWVbXT4ge1xuICAgIHJldHVybiBrZXlzKHRoaXMubWFwKTtcbiAgfVxuXG4gIHZhbHVlcygpOiBJdGVyYWJsZTxUPiB7XG4gICAgcmV0dXJuIHZhbHVlcyh0aGlzLm1hcCk7XG4gIH1cbn1cblxuZnVuY3Rpb24ga2V5cyhtYXA6IFByaXZhdGVNYXA8dW5rbm93bj4sIHN0YWNrOiBJZFZhbHVlW10gPSBbXSk6IFByaW1hcnlLZXlbXSB7XG4gIGxldCBvdXQgPSBbXTtcblxuICBmb3IgKGxldCBba2V5LCB2YWx1ZV0gb2YgbWFwLmVudHJpZXMoKSkge1xuICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIE1hcCkge1xuICAgICAgb3V0LnB1c2goLi4ua2V5cyh2YWx1ZSwgWy4uLnN0YWNrLCBrZXldKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG91dC5wdXNoKFsuLi5zdGFjaywga2V5XSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG91dDtcbn1cblxuZnVuY3Rpb24gdmFsdWVzPFQ+KG1hcDogUHJpdmF0ZU1hcDxUPik6IFRbXSB7XG4gIGxldCBvdXQgPSBbXTtcblxuICBmb3IgKGxldCB2YWx1ZSBvZiBtYXAudmFsdWVzKCkpIHtcbiAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBNYXApIHtcbiAgICAgIG91dC5wdXNoKC4uLnZhbHVlcyh2YWx1ZSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBvdXQucHVzaCh2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG91dDtcbn1cbiJdfQ==