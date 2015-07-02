import Ember from 'ember';

export default Ember.Route.extend({
  boombox: Ember.inject.service(),

  model: function(params) {
    return this.store.find('pattern', params.id);
  },

  setupController: function(controller, model) {
    var record = JSON.parse(model.get('content'));
    controller.set('player', record.player);
    controller.set('pattern', record.pattern);
    controller.set('model', model);
  },

  activate: function() {
    this.get('boombox');
  },

  actions: {
    error: function(error, transition) {
      if (error) {
        console.error(error);
        return this.transitionTo('/');
      }
    }
  }

});
