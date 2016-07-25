import Ember from 'ember';

export default Ember.Service.extend({
  lastRoute: null,
  lastModel: null,

  visit(route, model) {
    this.set("lastRoute", route);
    this.set("lastModel", model);
  },

  back() {
    return this.getProperties("lastRoute", "lastModel");
  }
});
