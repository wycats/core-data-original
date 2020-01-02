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
            .find(this.args.model)
            .select("upvotes", "downvotes");
        return upvotes - downvotes;
    }
}
__decorate([
    use
], default_1.prototype, "db", void 0);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5zd2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYW5zd2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLE9BQU8sU0FBUyxNQUFNLG9CQUFvQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxHQUFHLEVBQVcsTUFBTSxtQkFBbUIsQ0FBQztBQUdqRCxNQUFNLENBQUMsT0FBTyxnQkFBTyxTQUFRLFNBQVM7SUFLcEMsSUFBSSxLQUFLO1FBQ1AsNkRBQTZEO1FBQzdELElBQUksRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLEdBQUcsSUFBSSxDQUFDLEVBQUU7YUFDakMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO2FBQ3JCLE1BQU0sQ0FBQyxTQUFTLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFFbEMsT0FBTyxPQUFPLEdBQUcsU0FBUyxDQUFDO0lBQzdCLENBQUM7Q0FDRjtBQVpNO0lBQUosR0FBRztxQ0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDb21wb25lbnQgZnJvbSBcIkBnbGltbWVyL2NvbXBvbmVudFwiO1xuaW1wb3J0IHsgdXNlLCBRYW5kYURiIH0gZnJvbSBcImR1bW15L3NlcnZpY2VzL2RiXCI7XG5pbXBvcnQgeyBFbnRpdHkgfSBmcm9tIFwiY29yZS1kYXRhL3RhYmxlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgQHVzZSBkYiE6IFFhbmRhRGI7XG5cbiAgZGVjbGFyZSBhcmdzOiB7IG1vZGVsOiBFbnRpdHk8XCJxdWVzdGlvblwiPiB9O1xuXG4gIGdldCB2b3RlcygpIHtcbiAgICAvLyBhIG1vZGVsbGluZyBmYWNpbGl0eSBtYWtlcyBzZW5zZSwgYnV0IHRoaXMgaXMgdGhlIGxvbmdoYW5kXG4gICAgbGV0IHsgdXB2b3RlcywgZG93bnZvdGVzIH0gPSB0aGlzLmRiXG4gICAgICAuZmluZCh0aGlzLmFyZ3MubW9kZWwpXG4gICAgICAuc2VsZWN0KFwidXB2b3Rlc1wiLCBcImRvd252b3Rlc1wiKTtcblxuICAgIHJldHVybiB1cHZvdGVzIC0gZG93bnZvdGVzO1xuICB9XG59XG4iXX0=