import AddonDocsRouter, { docsRoute } from "ember-cli-addon-docs/router";
import config from "./config/environment";

const Router = AddonDocsRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  docsRoute(this, function() {
    /* Your docs routes go here */
    this.route("usage");
    this.route("tutorial");
  });

  this.route("index", { path: "/" });
  this.route("question", { path: "/questions/:id" });

  this.route("spacex", function() {});
});

export default Router;
