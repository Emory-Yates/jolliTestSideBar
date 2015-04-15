import Ember from 'ember';
import config from 'jolliTest/config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route("about");
  this.route("contact");
  this.route("courses");
  this.route("faqs");
  this.route("join");
});

export default Router;
