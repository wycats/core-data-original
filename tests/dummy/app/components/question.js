var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import Component from "@glimmer/component";
import { use } from "dummy/services/db";
import { action } from "@ember/object";
export default class default_1 extends Component {
    upvote() {
        let { upvotes } = this.db.find(this.args.question).select("upvotes");
        this.db.update(this.args.question, { upvotes: upvotes + 1 });
    }
    downvote() {
        let { downvotes } = this.db.find(this.args.question).select("downvotes");
        this.db.update(this.args.question, { downvotes: downvotes + 1 });
    }
    get votes() {
        // a modelling facility makes sense, but this is the longhand
        let { upvotes, downvotes } = this.db
            .find(this.args.question)
            .select("upvotes", "downvotes");
        return upvotes - downvotes;
    }
    get answers() {
        return this.db.all("answer").where({ question: this.args.question });
    }
    get answerCount() {
        return this.db
            .all("answer")
            .where({ question: this.args.question })
            .count();
    }
}
__decorate([
    use
], default_1.prototype, "db", void 0);
__decorate([
    action
], default_1.prototype, "upvote", null);
__decorate([
    action
], default_1.prototype, "downvote", null);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlc3Rpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJxdWVzdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxPQUFPLFNBQVMsTUFBTSxvQkFBb0IsQ0FBQztBQUMzQyxPQUFPLEVBQUUsR0FBRyxFQUFXLE1BQU0sbUJBQW1CLENBQUM7QUFFakQsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV2QyxNQUFNLENBQUMsT0FBTyxnQkFBTyxTQUFRLFNBQVM7SUFNcEMsTUFBTTtRQUNKLElBQUksRUFBRSxPQUFPLEVBQUUsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUVyRSxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFLE9BQU8sRUFBRSxPQUFPLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUMvRCxDQUFDO0lBR0QsUUFBUTtRQUNOLElBQUksRUFBRSxTQUFTLEVBQUUsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUV6RSxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFLFNBQVMsRUFBRSxTQUFTLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNuRSxDQUFDO0lBRUQsSUFBSSxLQUFLO1FBQ1AsNkRBQTZEO1FBQzdELElBQUksRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLEdBQUcsSUFBSSxDQUFDLEVBQUU7YUFDakMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO2FBQ3hCLE1BQU0sQ0FBQyxTQUFTLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFFbEMsT0FBTyxPQUFPLEdBQUcsU0FBUyxDQUFDO0lBQzdCLENBQUM7SUFFRCxJQUFJLE9BQU87UUFDVCxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7SUFDdkUsQ0FBQztJQUVELElBQUksV0FBVztRQUNiLE9BQU8sSUFBSSxDQUFDLEVBQUU7YUFDWCxHQUFHLENBQUMsUUFBUSxDQUFDO2FBQ2IsS0FBSyxDQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7YUFDdkMsS0FBSyxFQUFFLENBQUM7SUFDYixDQUFDO0NBQ0Y7QUFyQ007SUFBSixHQUFHO3FDQUFjO0FBS2xCO0lBREMsTUFBTTt1Q0FLTjtBQUdEO0lBREMsTUFBTTt5Q0FLTiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDb21wb25lbnQgZnJvbSBcIkBnbGltbWVyL2NvbXBvbmVudFwiO1xuaW1wb3J0IHsgdXNlLCBRYW5kYURiIH0gZnJvbSBcImR1bW15L3NlcnZpY2VzL2RiXCI7XG5pbXBvcnQgeyBFbnRpdHkgfSBmcm9tIFwiY29yZS1kYXRhL3RhYmxlXCI7XG5pbXBvcnQgeyBhY3Rpb24gfSBmcm9tIFwiQGVtYmVyL29iamVjdFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIENvbXBvbmVudCB7XG4gIEB1c2UgZGIhOiBRYW5kYURiO1xuXG4gIGRlY2xhcmUgYXJnczogeyBxdWVzdGlvbjogRW50aXR5PFwicXVlc3Rpb25cIj4gfTtcblxuICBAYWN0aW9uXG4gIHVwdm90ZSgpIHtcbiAgICBsZXQgeyB1cHZvdGVzIH0gPSB0aGlzLmRiLmZpbmQodGhpcy5hcmdzLnF1ZXN0aW9uKS5zZWxlY3QoXCJ1cHZvdGVzXCIpO1xuXG4gICAgdGhpcy5kYi51cGRhdGUodGhpcy5hcmdzLnF1ZXN0aW9uLCB7IHVwdm90ZXM6IHVwdm90ZXMgKyAxIH0pO1xuICB9XG5cbiAgQGFjdGlvblxuICBkb3dudm90ZSgpIHtcbiAgICBsZXQgeyBkb3dudm90ZXMgfSA9IHRoaXMuZGIuZmluZCh0aGlzLmFyZ3MucXVlc3Rpb24pLnNlbGVjdChcImRvd252b3Rlc1wiKTtcblxuICAgIHRoaXMuZGIudXBkYXRlKHRoaXMuYXJncy5xdWVzdGlvbiwgeyBkb3dudm90ZXM6IGRvd252b3RlcyArIDEgfSk7XG4gIH1cblxuICBnZXQgdm90ZXMoKSB7XG4gICAgLy8gYSBtb2RlbGxpbmcgZmFjaWxpdHkgbWFrZXMgc2Vuc2UsIGJ1dCB0aGlzIGlzIHRoZSBsb25naGFuZFxuICAgIGxldCB7IHVwdm90ZXMsIGRvd252b3RlcyB9ID0gdGhpcy5kYlxuICAgICAgLmZpbmQodGhpcy5hcmdzLnF1ZXN0aW9uKVxuICAgICAgLnNlbGVjdChcInVwdm90ZXNcIiwgXCJkb3dudm90ZXNcIik7XG5cbiAgICByZXR1cm4gdXB2b3RlcyAtIGRvd252b3RlcztcbiAgfVxuXG4gIGdldCBhbnN3ZXJzKCkge1xuICAgIHJldHVybiB0aGlzLmRiLmFsbChcImFuc3dlclwiKS53aGVyZSh7IHF1ZXN0aW9uOiB0aGlzLmFyZ3MucXVlc3Rpb24gfSk7XG4gIH1cblxuICBnZXQgYW5zd2VyQ291bnQoKSB7XG4gICAgcmV0dXJuIHRoaXMuZGJcbiAgICAgIC5hbGwoXCJhbnN3ZXJcIilcbiAgICAgIC53aGVyZSh7IHF1ZXN0aW9uOiB0aGlzLmFyZ3MucXVlc3Rpb24gfSlcbiAgICAgIC5jb3VudCgpO1xuICB9XG59XG4iXX0=