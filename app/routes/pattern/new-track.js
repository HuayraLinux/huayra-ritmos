import Ember from 'ember';

export default Ember.Route.extend({
  history: Ember.inject.service(),

  actions: {
    close() {
      let {lastRoute, lastModel} = this.get("history").back();

      this.transitionTo(lastRoute, lastModel);
    },
  }

});
