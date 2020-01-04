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
    vote(direction) {
        let answer = this.args.model;
        switch (direction) {
            case "up":
                let { upvotes } = this.db.find(answer).select("upvotes");
                this.db.update(answer, { upvotes: upvotes + 1 });
                return;
            case "down":
                let { downvotes } = this.db.find(answer).select("downvotes");
                this.db.update(answer, { downvotes: downvotes + 1 });
                return;
        }
    }
    get votes() {
        // a modelling facility makes sense, but this is the longhand
        let { upvotes, downvotes } = this.db
            .find(this.args.model)
            .select("upvotes", "downvotes");
        return upvotes - downvotes;
    }
}
__decorate([
    use
], default_1.prototype, "db", void 0);
__decorate([
    action
], default_1.prototype, "vote", null);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5zd2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYW5zd2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLE9BQU8sU0FBUyxNQUFNLG9CQUFvQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxHQUFHLEVBQVcsTUFBTSxtQkFBbUIsQ0FBQztBQUVqRCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXZDLE1BQU0sQ0FBQyxPQUFPLGdCQUFPLFNBQVEsU0FBUztJQU1wQyxJQUFJLENBQUMsU0FBd0I7UUFDM0IsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7UUFFN0IsUUFBUSxTQUFTLEVBQUU7WUFDakIsS0FBSyxJQUFJO2dCQUNQLElBQUksRUFBRSxPQUFPLEVBQUUsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQ3pELElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxFQUFFLE9BQU8sRUFBRSxPQUFPLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDakQsT0FBTztZQUVULEtBQUssTUFBTTtnQkFDVCxJQUFJLEVBQUUsU0FBUyxFQUFFLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO2dCQUM3RCxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsRUFBRSxTQUFTLEVBQUUsU0FBUyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQ3JELE9BQU87U0FDVjtJQUNILENBQUM7SUFFRCxJQUFJLEtBQUs7UUFDUCw2REFBNkQ7UUFDN0QsSUFBSSxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsR0FBRyxJQUFJLENBQUMsRUFBRTthQUNqQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7YUFDckIsTUFBTSxDQUFDLFNBQVMsRUFBRSxXQUFXLENBQUMsQ0FBQztRQUVsQyxPQUFPLE9BQU8sR0FBRyxTQUFTLENBQUM7SUFDN0IsQ0FBQztDQUNGO0FBN0JNO0lBQUosR0FBRztxQ0FBYztBQUtsQjtJQURDLE1BQU07cUNBZU4iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ29tcG9uZW50IGZyb20gXCJAZ2xpbW1lci9jb21wb25lbnRcIjtcbmltcG9ydCB7IHVzZSwgUWFuZGFEYiB9IGZyb20gXCJkdW1teS9zZXJ2aWNlcy9kYlwiO1xuaW1wb3J0IHsgRW50aXR5IH0gZnJvbSBcImNvcmUtZGF0YS90YWJsZVwiO1xuaW1wb3J0IHsgYWN0aW9uIH0gZnJvbSBcIkBlbWJlci9vYmplY3RcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBDb21wb25lbnQge1xuICBAdXNlIGRiITogUWFuZGFEYjtcblxuICBkZWNsYXJlIGFyZ3M6IHsgbW9kZWw6IEVudGl0eTxcInF1ZXN0aW9uXCI+IH07XG5cbiAgQGFjdGlvblxuICB2b3RlKGRpcmVjdGlvbjogXCJ1cFwiIHwgXCJkb3duXCIpIHtcbiAgICBsZXQgYW5zd2VyID0gdGhpcy5hcmdzLm1vZGVsO1xuXG4gICAgc3dpdGNoIChkaXJlY3Rpb24pIHtcbiAgICAgIGNhc2UgXCJ1cFwiOlxuICAgICAgICBsZXQgeyB1cHZvdGVzIH0gPSB0aGlzLmRiLmZpbmQoYW5zd2VyKS5zZWxlY3QoXCJ1cHZvdGVzXCIpO1xuICAgICAgICB0aGlzLmRiLnVwZGF0ZShhbnN3ZXIsIHsgdXB2b3RlczogdXB2b3RlcyArIDEgfSk7XG4gICAgICAgIHJldHVybjtcblxuICAgICAgY2FzZSBcImRvd25cIjpcbiAgICAgICAgbGV0IHsgZG93bnZvdGVzIH0gPSB0aGlzLmRiLmZpbmQoYW5zd2VyKS5zZWxlY3QoXCJkb3dudm90ZXNcIik7XG4gICAgICAgIHRoaXMuZGIudXBkYXRlKGFuc3dlciwgeyBkb3dudm90ZXM6IGRvd252b3RlcyArIDEgfSk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gIH1cblxuICBnZXQgdm90ZXMoKSB7XG4gICAgLy8gYSBtb2RlbGxpbmcgZmFjaWxpdHkgbWFrZXMgc2Vuc2UsIGJ1dCB0aGlzIGlzIHRoZSBsb25naGFuZFxuICAgIGxldCB7IHVwdm90ZXMsIGRvd252b3RlcyB9ID0gdGhpcy5kYlxuICAgICAgLmZpbmQodGhpcy5hcmdzLm1vZGVsKVxuICAgICAgLnNlbGVjdChcInVwdm90ZXNcIiwgXCJkb3dudm90ZXNcIik7XG5cbiAgICByZXR1cm4gdXB2b3RlcyAtIGRvd252b3RlcztcbiAgfVxufVxuIl19