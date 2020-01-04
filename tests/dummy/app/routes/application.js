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
            name: () => faker.fake("{{commerce.productAdjective}} {{commerce.productMaterial}} {{system.semver}}"),
        }, 100);
        db.populate("launch", {
            site: () => faker.fake("{{address.city}}, {{address.country}}"),
            mission: () => faker.random.arrayElement(missions),
            rocket: () => faker.random.arrayElement(rockets),
            isBooked: faker.random.boolean
        }, 300);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwbGljYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhcHBsaWNhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxPQUFPLEtBQUssTUFBTSxzQkFBc0IsQ0FBQztBQUN6QyxPQUFPLEtBQUssTUFBTSxPQUFPLENBQUM7QUFDMUIsT0FBTyxFQUFXLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRzlDLE1BQU0sQ0FBQyxPQUFPLE9BQU8sVUFBVyxTQUFRLEtBQUs7SUFJM0MsS0FBSztRQUNILElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUNyQixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQUVPLGNBQWM7UUFDcEIsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUVyQixJQUFJLE9BQU8sR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRTtZQUNsQyxJQUFJLEVBQUUsS0FBSyxDQUFDLFFBQVEsQ0FBQyxXQUFXO1lBQ2hDLElBQUksRUFBRSxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDO1NBQzdDLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFFUCxJQUFJLFFBQVEsR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRTtZQUNwQyxJQUFJLEVBQUUsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyw4RUFBOEUsQ0FBQztTQUN2RyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBRVIsRUFBRSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUU7WUFDcEIsSUFBSSxFQUFFLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsdUNBQXVDLENBQUM7WUFDL0QsT0FBTyxFQUFFLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQztZQUNsRCxNQUFNLEVBQUUsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDO1lBQ2hELFFBQVEsRUFBRSxLQUFLLENBQUMsTUFBTSxDQUFDLE9BQU87U0FDL0IsRUFBRSxHQUFHLENBQUMsQ0FBQTtJQUNULENBQUM7SUFFTyxhQUFhO1FBQ25CLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUM7UUFFakIsSUFBSSxLQUFLLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FDckIsTUFBTSxFQUNOO1lBQ0UsUUFBUSxFQUFFLEtBQUssQ0FBQyxRQUFRLENBQUMsUUFBUTtTQUNsQyxFQUNELEVBQUUsQ0FDSCxDQUFDO1FBRUYsSUFBSSxTQUFTLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FDekIsVUFBVSxFQUNWO1lBQ0UsS0FBSyxFQUFFLEtBQUssQ0FBQyxLQUFLLENBQUMsUUFBUTtZQUMzQixJQUFJLEVBQUUsS0FBSyxDQUFDLEtBQUssQ0FBQyxVQUFVO1lBQzVCLGNBQWMsRUFBRSxLQUFLLENBQUMsTUFBTSxDQUFDLE9BQU87WUFDcEMsRUFBRSxFQUFFLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQztZQUMxQyxJQUFJLEVBQUUsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsQ0FBQztZQUNwRCxPQUFPLEVBQUUsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsQ0FBQztZQUN6RCxTQUFTLEVBQUUsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsQ0FBQztTQUM1RCxFQUNELEdBQUcsQ0FDSixDQUFDO1FBRUYsRUFBRSxDQUFDLFFBQVEsQ0FDVCxRQUFRLEVBQ1I7WUFDRSxFQUFFLEVBQUUsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDO1lBQzFDLElBQUksRUFBRSxLQUFLLENBQUMsS0FBSyxDQUFDLFVBQVU7WUFDNUIsUUFBUSxFQUFFLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQztZQUNwRCxPQUFPLEVBQUUsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsQ0FBQztZQUN6RCxTQUFTLEVBQUUsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsQ0FBQztTQUM1RCxFQUNELElBQUksQ0FDTCxDQUFDO0lBQ0osQ0FBQztDQUNGO0FBakVNO0lBQUosR0FBRztzQ0FBYztBQUNiO0lBQUosR0FBRzswQ0FBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUm91dGUgZnJvbSBcIkBlbWJlci9yb3V0aW5nL3JvdXRlXCI7XG5pbXBvcnQgZmFrZXIgZnJvbSBcImZha2VyXCI7XG5pbXBvcnQgeyBRYW5kYURiLCB1c2UgfSBmcm9tIFwiLi4vc2VydmljZXMvZGJcIjtcbmltcG9ydCB7IFNwYWNleERiIH0gZnJvbSBcIi4uL3NlcnZpY2VzL3NwYWNleFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbmRleFJvdXRlIGV4dGVuZHMgUm91dGUge1xuICBAdXNlIGRiITogUWFuZGFEYjtcbiAgQHVzZSBzcGFjZXghOiBTcGFjZXhEYjtcblxuICBtb2RlbCgpIHtcbiAgICB0aGlzLnBvcHVsYXRlUWFuZGEoKTtcbiAgICB0aGlzLnBvcHVsYXRlU3BhY2V4KCk7XG4gIH1cblxuICBwcml2YXRlIHBvcHVsYXRlU3BhY2V4KCkge1xuICAgIGxldCBkYiA9IHRoaXMuc3BhY2V4O1xuXG4gICAgbGV0IHJvY2tldHMgPSBkYi5wb3B1bGF0ZShcInJvY2tldFwiLCB7XG4gICAgICBuYW1lOiBmYWtlci5jb21tZXJjZS5wcm9kdWN0TmFtZSxcbiAgICAgIHR5cGU6ICgpID0+IGZha2VyLmZha2UoXCJ2e3tzeXN0ZW0uc2VtdmVyfX1cIilcbiAgICB9LCAxMCk7XG5cbiAgICBsZXQgbWlzc2lvbnMgPSBkYi5wb3B1bGF0ZShcIm1pc3Npb25cIiwge1xuICAgICAgbmFtZTogKCkgPT4gZmFrZXIuZmFrZShcInt7Y29tbWVyY2UucHJvZHVjdEFkamVjdGl2ZX19IHt7Y29tbWVyY2UucHJvZHVjdE1hdGVyaWFsfX0ge3tzeXN0ZW0uc2VtdmVyfX1cIiksXG4gICAgfSwgMTAwKTtcblxuICAgIGRiLnBvcHVsYXRlKFwibGF1bmNoXCIsIHtcbiAgICAgIHNpdGU6ICgpID0+IGZha2VyLmZha2UoXCJ7e2FkZHJlc3MuY2l0eX19LCB7e2FkZHJlc3MuY291bnRyeX19XCIpLFxuICAgICAgbWlzc2lvbjogKCkgPT4gZmFrZXIucmFuZG9tLmFycmF5RWxlbWVudChtaXNzaW9ucyksXG4gICAgICByb2NrZXQ6ICgpID0+IGZha2VyLnJhbmRvbS5hcnJheUVsZW1lbnQocm9ja2V0cyksXG4gICAgICBpc0Jvb2tlZDogZmFrZXIucmFuZG9tLmJvb2xlYW5cbiAgICB9LCAzMDApXG4gIH1cblxuICBwcml2YXRlIHBvcHVsYXRlUWFuZGEoKSB7XG4gICAgbGV0IGRiID0gdGhpcy5kYjtcblxuICAgIGxldCB1c2VycyA9IGRiLnBvcHVsYXRlKFxuICAgICAgXCJ1c2VyXCIsXG4gICAgICB7XG4gICAgICAgIHVzZXJuYW1lOiBmYWtlci5pbnRlcm5ldC51c2VyTmFtZVxuICAgICAgfSxcbiAgICAgIDEwXG4gICAgKTtcblxuICAgIGxldCBxdWVzdGlvbnMgPSBkYi5wb3B1bGF0ZShcbiAgICAgIFwicXVlc3Rpb25cIixcbiAgICAgIHtcbiAgICAgICAgdGl0bGU6IGZha2VyLmxvcmVtLnNlbnRlbmNlLFxuICAgICAgICBib2R5OiBmYWtlci5sb3JlbS5wYXJhZ3JhcGhzLFxuICAgICAgICBzZWxlY3RlZEFuc3dlcjogZmFrZXIucmFuZG9tLmJvb2xlYW4sXG4gICAgICAgIGJ5OiAoKSA9PiBmYWtlci5yYW5kb20uYXJyYXlFbGVtZW50KHVzZXJzKSxcbiAgICAgICAgcmFuazogKCkgPT4gZmFrZXIucmFuZG9tLm51bWJlcih7IG1pbjogMCwgbWF4OiAxMCB9KSxcbiAgICAgICAgdXB2b3RlczogKCkgPT4gZmFrZXIucmFuZG9tLm51bWJlcih7IG1pbjogMCwgbWF4OiAxMDAwIH0pLFxuICAgICAgICBkb3dudm90ZXM6ICgpID0+IGZha2VyLnJhbmRvbS5udW1iZXIoeyBtaW46IDAsIG1heDogMTAwMCB9KVxuICAgICAgfSxcbiAgICAgIDEwMFxuICAgICk7XG5cbiAgICBkYi5wb3B1bGF0ZShcbiAgICAgIFwiYW5zd2VyXCIsXG4gICAgICB7XG4gICAgICAgIGJ5OiAoKSA9PiBmYWtlci5yYW5kb20uYXJyYXlFbGVtZW50KHVzZXJzKSxcbiAgICAgICAgYm9keTogZmFrZXIubG9yZW0ucGFyYWdyYXBocyxcbiAgICAgICAgcXVlc3Rpb246ICgpID0+IGZha2VyLnJhbmRvbS5hcnJheUVsZW1lbnQocXVlc3Rpb25zKSxcbiAgICAgICAgdXB2b3RlczogKCkgPT4gZmFrZXIucmFuZG9tLm51bWJlcih7IG1pbjogMCwgbWF4OiAxMDAwIH0pLFxuICAgICAgICBkb3dudm90ZXM6ICgpID0+IGZha2VyLnJhbmRvbS5udW1iZXIoeyBtaW46IDAsIG1heDogMTAwMCB9KVxuICAgICAgfSxcbiAgICAgIDEwMDBcbiAgICApO1xuICB9XG59XG4iXX0=