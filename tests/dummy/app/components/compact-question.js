var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import Component from "@glimmer/component";
import { use } from "dummy/services/db";
export default class default_1 extends Component {
    get votes() {
        // a modelling facility makes sense, but this is the longhand
        let { upvotes, downvotes } = this.db
            .find(this.args.question)
            .select("upvotes", "downvotes");
        return upvotes - downvotes;
    }
    get answers() {
        // a hasMany facility makes sense, this is the longhand
        return this.db
            .all("answer")
            .where({ question: this.args.question })
            .count();
    }
}
__decorate([
    use
], default_1.prototype, "db", void 0);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcGFjdC1xdWVzdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNvbXBhY3QtcXVlc3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxTQUFTLE1BQU0sb0JBQW9CLENBQUM7QUFFM0MsT0FBTyxFQUFFLEdBQUcsRUFBVyxNQUFNLG1CQUFtQixDQUFDO0FBRWpELE1BQU0sQ0FBQyxPQUFPLGdCQUFPLFNBQVEsU0FBUztJQUtwQyxJQUFJLEtBQUs7UUFDUCw2REFBNkQ7UUFDN0QsSUFBSSxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsR0FBRyxJQUFJLENBQUMsRUFBRTthQUNqQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7YUFDeEIsTUFBTSxDQUFDLFNBQVMsRUFBRSxXQUFXLENBQUMsQ0FBQztRQUVsQyxPQUFPLE9BQU8sR0FBRyxTQUFTLENBQUM7SUFDN0IsQ0FBQztJQUVELElBQUksT0FBTztRQUNULHVEQUF1RDtRQUN2RCxPQUFPLElBQUksQ0FBQyxFQUFFO2FBQ1gsR0FBRyxDQUFDLFFBQVEsQ0FBQzthQUNiLEtBQUssQ0FBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO2FBQ3ZDLEtBQUssRUFBRSxDQUFDO0lBQ2IsQ0FBQztDQUNGO0FBcEJNO0lBQUosR0FBRztxQ0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDb21wb25lbnQgZnJvbSBcIkBnbGltbWVyL2NvbXBvbmVudFwiO1xuaW1wb3J0IHsgRW50aXR5IH0gZnJvbSBcImNvcmUtZGF0YS90YWJsZVwiO1xuaW1wb3J0IHsgdXNlLCBRYW5kYURiIH0gZnJvbSBcImR1bW15L3NlcnZpY2VzL2RiXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgQHVzZSBkYiE6IFFhbmRhRGI7XG5cbiAgZGVjbGFyZSBhcmdzOiB7IHF1ZXN0aW9uOiBFbnRpdHk8XCJxdWVzdGlvblwiPiB9O1xuXG4gIGdldCB2b3RlcygpIHtcbiAgICAvLyBhIG1vZGVsbGluZyBmYWNpbGl0eSBtYWtlcyBzZW5zZSwgYnV0IHRoaXMgaXMgdGhlIGxvbmdoYW5kXG4gICAgbGV0IHsgdXB2b3RlcywgZG93bnZvdGVzIH0gPSB0aGlzLmRiXG4gICAgICAuZmluZCh0aGlzLmFyZ3MucXVlc3Rpb24pXG4gICAgICAuc2VsZWN0KFwidXB2b3Rlc1wiLCBcImRvd252b3Rlc1wiKTtcblxuICAgIHJldHVybiB1cHZvdGVzIC0gZG93bnZvdGVzO1xuICB9XG5cbiAgZ2V0IGFuc3dlcnMoKSB7XG4gICAgLy8gYSBoYXNNYW55IGZhY2lsaXR5IG1ha2VzIHNlbnNlLCB0aGlzIGlzIHRoZSBsb25naGFuZFxuICAgIHJldHVybiB0aGlzLmRiXG4gICAgICAuYWxsKFwiYW5zd2VyXCIpXG4gICAgICAud2hlcmUoeyBxdWVzdGlvbjogdGhpcy5hcmdzLnF1ZXN0aW9uIH0pXG4gICAgICAuY291bnQoKTtcbiAgfVxufVxuIl19