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
    controller.set('unsavedChanges', false);
    controller.notifyEnterTransition();
  },

  deactivate: function() {
    this.controllerFor('pattern').notifyLeaveTransition();
  },

  activate: function() {
    this.get('boombox');
  },

  actions: {
    error: function(error) {
      if (error.message.indexOf('as id to the store') > -1) {
        console.error(error);
        console.log("Redireccionando a /new (no se encontró la canción.)");
        return this.transitionTo('new');
      }
    }
  }

});
