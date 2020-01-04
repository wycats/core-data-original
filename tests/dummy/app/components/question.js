var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import Component from "@glimmer/component";
import { use } from "dummy/services/db";
import { action } from "@ember/object";
import faker from "faker";
export default class default_1 extends Component {
    vote(direction) {
        let question = this.args.question;
        switch (direction) {
            case "up":
                let { upvotes } = this.db.find(question).select("upvotes");
                this.db.update(question, { upvotes: upvotes + 1 });
                return;
            case "down":
                let { downvotes } = this.db.find(question).select("downvotes");
                this.db.update(question, { downvotes: downvotes + 1 });
                return;
        }
    }
    generateAnswer() {
        let users = this.db.all("user");
        this.db.add("answer", {
            id: this.db.nextId(),
            by: faker.random.arrayElement([...users]),
            body: faker.lorem.paragraphs(),
            question: this.args.question,
            upvotes: 0,
            downvotes: 0
        });
    }
    get answers() {
        return [...this.db.all("answer").where({ question: this.args.question })];
    }
    get votes() {
        // a modelling facility makes sense, but this is the longhand
        let { upvotes, downvotes } = this.db
            .find(this.args.question)
            .select("upvotes", "downvotes");
        return upvotes - downvotes;
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
], default_1.prototype, "vote", null);
__decorate([
    action
], default_1.prototype, "generateAnswer", null);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlc3Rpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJxdWVzdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxPQUFPLFNBQVMsTUFBTSxvQkFBb0IsQ0FBQztBQUMzQyxPQUFPLEVBQUUsR0FBRyxFQUFXLE1BQU0sbUJBQW1CLENBQUM7QUFFakQsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEtBQUssTUFBTSxPQUFPLENBQUM7QUFFMUIsTUFBTSxDQUFDLE9BQU8sZ0JBQU8sU0FBUSxTQUFTO0lBTXBDLElBQUksQ0FBQyxTQUF3QjtRQUMzQixJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUVsQyxRQUFRLFNBQVMsRUFBRTtZQUNqQixLQUFLLElBQUk7Z0JBQ1AsSUFBSSxFQUFFLE9BQU8sRUFBRSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDM0QsSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLEVBQUUsT0FBTyxFQUFFLE9BQU8sR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUNuRCxPQUFPO1lBRVQsS0FBSyxNQUFNO2dCQUNULElBQUksRUFBRSxTQUFTLEVBQUUsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7Z0JBQy9ELElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxFQUFFLFNBQVMsRUFBRSxTQUFTLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDdkQsT0FBTztTQUNWO0lBQ0gsQ0FBQztJQUdELGNBQWM7UUFDWixJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUVoQyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUU7WUFDcEIsRUFBRSxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFO1lBQ3BCLEVBQUUsRUFBRSxLQUFLLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUM7WUFDekMsSUFBSSxFQUFFLEtBQUssQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFFO1lBQzlCLFFBQVEsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVE7WUFDNUIsT0FBTyxFQUFFLENBQUM7WUFDVixTQUFTLEVBQUUsQ0FBQztTQUNiLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxJQUFJLE9BQU87UUFDVCxPQUFPLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDNUUsQ0FBQztJQUVELElBQUksS0FBSztRQUNQLDZEQUE2RDtRQUM3RCxJQUFJLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxHQUFHLElBQUksQ0FBQyxFQUFFO2FBQ2pDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQzthQUN4QixNQUFNLENBQUMsU0FBUyxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBRWxDLE9BQU8sT0FBTyxHQUFHLFNBQVMsQ0FBQztJQUM3QixDQUFDO0lBRUQsSUFBSSxXQUFXO1FBQ2IsT0FBTyxJQUFJLENBQUMsRUFBRTthQUNYLEdBQUcsQ0FBQyxRQUFRLENBQUM7YUFDYixLQUFLLENBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQzthQUN2QyxLQUFLLEVBQUUsQ0FBQztJQUNiLENBQUM7Q0FDRjtBQXRETTtJQUFKLEdBQUc7cUNBQWM7QUFLbEI7SUFEQyxNQUFNO3FDQWVOO0FBR0Q7SUFEQyxNQUFNOytDQVlOIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IENvbXBvbmVudCBmcm9tIFwiQGdsaW1tZXIvY29tcG9uZW50XCI7XG5pbXBvcnQgeyB1c2UsIFFhbmRhRGIgfSBmcm9tIFwiZHVtbXkvc2VydmljZXMvZGJcIjtcbmltcG9ydCB7IEVudGl0eSB9IGZyb20gXCJjb3JlLWRhdGEvdGFibGVcIjtcbmltcG9ydCB7IGFjdGlvbiB9IGZyb20gXCJAZW1iZXIvb2JqZWN0XCI7XG5pbXBvcnQgZmFrZXIgZnJvbSBcImZha2VyXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgQHVzZSBkYiE6IFFhbmRhRGI7XG5cbiAgZGVjbGFyZSBhcmdzOiB7IHF1ZXN0aW9uOiBFbnRpdHk8XCJxdWVzdGlvblwiPiB9O1xuXG4gIEBhY3Rpb25cbiAgdm90ZShkaXJlY3Rpb246IFwidXBcIiB8IFwiZG93blwiKSB7XG4gICAgbGV0IHF1ZXN0aW9uID0gdGhpcy5hcmdzLnF1ZXN0aW9uO1xuXG4gICAgc3dpdGNoIChkaXJlY3Rpb24pIHtcbiAgICAgIGNhc2UgXCJ1cFwiOlxuICAgICAgICBsZXQgeyB1cHZvdGVzIH0gPSB0aGlzLmRiLmZpbmQocXVlc3Rpb24pLnNlbGVjdChcInVwdm90ZXNcIik7XG4gICAgICAgIHRoaXMuZGIudXBkYXRlKHF1ZXN0aW9uLCB7IHVwdm90ZXM6IHVwdm90ZXMgKyAxIH0pO1xuICAgICAgICByZXR1cm47XG5cbiAgICAgIGNhc2UgXCJkb3duXCI6XG4gICAgICAgIGxldCB7IGRvd252b3RlcyB9ID0gdGhpcy5kYi5maW5kKHF1ZXN0aW9uKS5zZWxlY3QoXCJkb3dudm90ZXNcIik7XG4gICAgICAgIHRoaXMuZGIudXBkYXRlKHF1ZXN0aW9uLCB7IGRvd252b3RlczogZG93bnZvdGVzICsgMSB9KTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgfVxuXG4gIEBhY3Rpb25cbiAgZ2VuZXJhdGVBbnN3ZXIoKSB7XG4gICAgbGV0IHVzZXJzID0gdGhpcy5kYi5hbGwoXCJ1c2VyXCIpO1xuXG4gICAgdGhpcy5kYi5hZGQoXCJhbnN3ZXJcIiwge1xuICAgICAgaWQ6IHRoaXMuZGIubmV4dElkKCksXG4gICAgICBieTogZmFrZXIucmFuZG9tLmFycmF5RWxlbWVudChbLi4udXNlcnNdKSxcbiAgICAgIGJvZHk6IGZha2VyLmxvcmVtLnBhcmFncmFwaHMoKSxcbiAgICAgIHF1ZXN0aW9uOiB0aGlzLmFyZ3MucXVlc3Rpb24sXG4gICAgICB1cHZvdGVzOiAwLFxuICAgICAgZG93bnZvdGVzOiAwXG4gICAgfSk7XG4gIH1cblxuICBnZXQgYW5zd2VycygpIHtcbiAgICByZXR1cm4gWy4uLnRoaXMuZGIuYWxsKFwiYW5zd2VyXCIpLndoZXJlKHsgcXVlc3Rpb246IHRoaXMuYXJncy5xdWVzdGlvbiB9KV07XG4gIH1cblxuICBnZXQgdm90ZXMoKSB7XG4gICAgLy8gYSBtb2RlbGxpbmcgZmFjaWxpdHkgbWFrZXMgc2Vuc2UsIGJ1dCB0aGlzIGlzIHRoZSBsb25naGFuZFxuICAgIGxldCB7IHVwdm90ZXMsIGRvd252b3RlcyB9ID0gdGhpcy5kYlxuICAgICAgLmZpbmQodGhpcy5hcmdzLnF1ZXN0aW9uKVxuICAgICAgLnNlbGVjdChcInVwdm90ZXNcIiwgXCJkb3dudm90ZXNcIik7XG5cbiAgICByZXR1cm4gdXB2b3RlcyAtIGRvd252b3RlcztcbiAgfVxuXG4gIGdldCBhbnN3ZXJDb3VudCgpIHtcbiAgICByZXR1cm4gdGhpcy5kYlxuICAgICAgLmFsbChcImFuc3dlclwiKVxuICAgICAgLndoZXJlKHsgcXVlc3Rpb246IHRoaXMuYXJncy5xdWVzdGlvbiB9KVxuICAgICAgLmNvdW50KCk7XG4gIH1cbn1cbiJdfQ==