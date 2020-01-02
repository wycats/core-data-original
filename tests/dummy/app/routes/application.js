var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import Route from "@ember/routing/route";
import faker from "faker";
import { use } from "../services/db";
export default class IndexRoute extends Route {
    model() {
        this.populateQanda();
        this.populateSpacex();
    }
    populateSpacex() {
        let db = this.spacex;
        let rockets = db.populate("rocket", {
            name: faker.commerce.productName,
            type: () => faker.fake("v{{system.semver}}")
        }, 10);
        let missions = db.populate("mission", {
            name: () => faker.fake("{{commerce.adjective}}"),
        }, 100);
        db.populate("launch", {}, 300);
    }
    populateQanda() {
        let db = this.db;
        let users = db.populate("user", {
            username: faker.internet.userName
        }, 10);
        let questions = db.populate("question", {
            title: faker.lorem.sentence,
            body: faker.lorem.paragraphs,
            selectedAnswer: faker.random.boolean,
            by: () => faker.random.arrayElement(users),
            rank: () => faker.random.number({ min: 0, max: 10 }),
            upvotes: () => faker.random.number({ min: 0, max: 1000 }),
            downvotes: () => faker.random.number({ min: 0, max: 1000 })
        }, 100);
        db.populate("answer", {
            by: () => faker.random.arrayElement(users),
            body: faker.lorem.paragraphs,
            question: () => faker.random.arrayElement(questions),
            upvotes: () => faker.random.number({ min: 0, max: 1000 }),
            downvotes: () => faker.random.number({ min: 0, max: 1000 })
        }, 1000);
    }
}
__decorate([
    use
], IndexRoute.prototype, "db", void 0);
__decorate([
    use
], IndexRoute.prototype, "spacex", void 0);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwbGljYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhcHBsaWNhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxPQUFPLEtBQUssTUFBTSxzQkFBc0IsQ0FBQztBQUN6QyxPQUFPLEtBQUssTUFBTSxPQUFPLENBQUM7QUFDMUIsT0FBTyxFQUFXLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRzlDLE1BQU0sQ0FBQyxPQUFPLE9BQU8sVUFBVyxTQUFRLEtBQUs7SUFJM0MsS0FBSztRQUNILElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUNyQixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQUVPLGNBQWM7UUFDcEIsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUVyQixJQUFJLE9BQU8sR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRTtZQUNsQyxJQUFJLEVBQUUsS0FBSyxDQUFDLFFBQVEsQ0FBQyxXQUFXO1lBQ2hDLElBQUksRUFBRSxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDO1NBQzdDLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFFUCxJQUFJLFFBQVEsR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRTtZQUNwQyxJQUFJLEVBQUUsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyx3QkFBd0IsQ0FBQztTQUNqRCxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBRVIsRUFBRSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsRUFFckIsRUFBRSxHQUFHLENBQUMsQ0FBQTtJQUNULENBQUM7SUFFTyxhQUFhO1FBQ25CLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUM7UUFFakIsSUFBSSxLQUFLLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FDckIsTUFBTSxFQUNOO1lBQ0UsUUFBUSxFQUFFLEtBQUssQ0FBQyxRQUFRLENBQUMsUUFBUTtTQUNsQyxFQUNELEVBQUUsQ0FDSCxDQUFDO1FBRUYsSUFBSSxTQUFTLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FDekIsVUFBVSxFQUNWO1lBQ0UsS0FBSyxFQUFFLEtBQUssQ0FBQyxLQUFLLENBQUMsUUFBUTtZQUMzQixJQUFJLEVBQUUsS0FBSyxDQUFDLEtBQUssQ0FBQyxVQUFVO1lBQzVCLGNBQWMsRUFBRSxLQUFLLENBQUMsTUFBTSxDQUFDLE9BQU87WUFDcEMsRUFBRSxFQUFFLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQztZQUMxQyxJQUFJLEVBQUUsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsQ0FBQztZQUNwRCxPQUFPLEVBQUUsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsQ0FBQztZQUN6RCxTQUFTLEVBQUUsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsQ0FBQztTQUM1RCxFQUNELEdBQUcsQ0FDSixDQUFDO1FBRUYsRUFBRSxDQUFDLFFBQVEsQ0FDVCxRQUFRLEVBQ1I7WUFDRSxFQUFFLEVBQUUsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDO1lBQzFDLElBQUksRUFBRSxLQUFLLENBQUMsS0FBSyxDQUFDLFVBQVU7WUFDNUIsUUFBUSxFQUFFLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQztZQUNwRCxPQUFPLEVBQUUsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsQ0FBQztZQUN6RCxTQUFTLEVBQUUsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsQ0FBQztTQUM1RCxFQUNELElBQUksQ0FDTCxDQUFDO0lBQ0osQ0FBQztDQUNGO0FBOURNO0lBQUosR0FBRztzQ0FBYztBQUNiO0lBQUosR0FBRzswQ0FBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUm91dGUgZnJvbSBcIkBlbWJlci9yb3V0aW5nL3JvdXRlXCI7XG5pbXBvcnQgZmFrZXIgZnJvbSBcImZha2VyXCI7XG5pbXBvcnQgeyBRYW5kYURiLCB1c2UgfSBmcm9tIFwiLi4vc2VydmljZXMvZGJcIjtcbmltcG9ydCB7IFNwYWNleERiIH0gZnJvbSBcIi4uL3NlcnZpY2VzL3NwYWNleFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbmRleFJvdXRlIGV4dGVuZHMgUm91dGUge1xuICBAdXNlIGRiITogUWFuZGFEYjtcbiAgQHVzZSBzcGFjZXghOiBTcGFjZXhEYjtcblxuICBtb2RlbCgpIHtcbiAgICB0aGlzLnBvcHVsYXRlUWFuZGEoKTtcbiAgICB0aGlzLnBvcHVsYXRlU3BhY2V4KCk7XG4gIH1cblxuICBwcml2YXRlIHBvcHVsYXRlU3BhY2V4KCkge1xuICAgIGxldCBkYiA9IHRoaXMuc3BhY2V4O1xuXG4gICAgbGV0IHJvY2tldHMgPSBkYi5wb3B1bGF0ZShcInJvY2tldFwiLCB7XG4gICAgICBuYW1lOiBmYWtlci5jb21tZXJjZS5wcm9kdWN0TmFtZSxcbiAgICAgIHR5cGU6ICgpID0+IGZha2VyLmZha2UoXCJ2e3tzeXN0ZW0uc2VtdmVyfX1cIilcbiAgICB9LCAxMCk7XG5cbiAgICBsZXQgbWlzc2lvbnMgPSBkYi5wb3B1bGF0ZShcIm1pc3Npb25cIiwge1xuICAgICAgbmFtZTogKCkgPT4gZmFrZXIuZmFrZShcInt7Y29tbWVyY2UuYWRqZWN0aXZlfX1cIiksXG4gICAgfSwgMTAwKTtcblxuICAgIGRiLnBvcHVsYXRlKFwibGF1bmNoXCIsIHtcblxuICAgIH0sIDMwMClcbiAgfVxuXG4gIHByaXZhdGUgcG9wdWxhdGVRYW5kYSgpIHtcbiAgICBsZXQgZGIgPSB0aGlzLmRiO1xuXG4gICAgbGV0IHVzZXJzID0gZGIucG9wdWxhdGUoXG4gICAgICBcInVzZXJcIixcbiAgICAgIHtcbiAgICAgICAgdXNlcm5hbWU6IGZha2VyLmludGVybmV0LnVzZXJOYW1lXG4gICAgICB9LFxuICAgICAgMTBcbiAgICApO1xuXG4gICAgbGV0IHF1ZXN0aW9ucyA9IGRiLnBvcHVsYXRlKFxuICAgICAgXCJxdWVzdGlvblwiLFxuICAgICAge1xuICAgICAgICB0aXRsZTogZmFrZXIubG9yZW0uc2VudGVuY2UsXG4gICAgICAgIGJvZHk6IGZha2VyLmxvcmVtLnBhcmFncmFwaHMsXG4gICAgICAgIHNlbGVjdGVkQW5zd2VyOiBmYWtlci5yYW5kb20uYm9vbGVhbixcbiAgICAgICAgYnk6ICgpID0+IGZha2VyLnJhbmRvbS5hcnJheUVsZW1lbnQodXNlcnMpLFxuICAgICAgICByYW5rOiAoKSA9PiBmYWtlci5yYW5kb20ubnVtYmVyKHsgbWluOiAwLCBtYXg6IDEwIH0pLFxuICAgICAgICB1cHZvdGVzOiAoKSA9PiBmYWtlci5yYW5kb20ubnVtYmVyKHsgbWluOiAwLCBtYXg6IDEwMDAgfSksXG4gICAgICAgIGRvd252b3RlczogKCkgPT4gZmFrZXIucmFuZG9tLm51bWJlcih7IG1pbjogMCwgbWF4OiAxMDAwIH0pXG4gICAgICB9LFxuICAgICAgMTAwXG4gICAgKTtcblxuICAgIGRiLnBvcHVsYXRlKFxuICAgICAgXCJhbnN3ZXJcIixcbiAgICAgIHtcbiAgICAgICAgYnk6ICgpID0+IGZha2VyLnJhbmRvbS5hcnJheUVsZW1lbnQodXNlcnMpLFxuICAgICAgICBib2R5OiBmYWtlci5sb3JlbS5wYXJhZ3JhcGhzLFxuICAgICAgICBxdWVzdGlvbjogKCkgPT4gZmFrZXIucmFuZG9tLmFycmF5RWxlbWVudChxdWVzdGlvbnMpLFxuICAgICAgICB1cHZvdGVzOiAoKSA9PiBmYWtlci5yYW5kb20ubnVtYmVyKHsgbWluOiAwLCBtYXg6IDEwMDAgfSksXG4gICAgICAgIGRvd252b3RlczogKCkgPT4gZmFrZXIucmFuZG9tLm51bWJlcih7IG1pbjogMCwgbWF4OiAxMDAwIH0pXG4gICAgICB9LFxuICAgICAgMTAwMFxuICAgICk7XG4gIH1cbn1cbiJdfQ==