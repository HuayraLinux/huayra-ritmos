import Ember from 'ember';

export default Ember.Route.extend({
  audio: Ember.inject.service(),

  model(params) {
    return this.store.find('pattern', params.id);
  },

  setupController(controller, model) {
    var record = JSON.parse(model.get('content'));

    controller.set('player', record.player);
    controller.set('pattern', record.pattern);
    controller.set('model', model);
    controller.set('unsavedChanges', false);
    controller.notifyEnterTransition();
  },

  deactivate() {
    this.controllerFor('pattern').notifyLeaveTransition();
  },

  activate() {
    this.get('audio');
  },

  actions: {
    error(error) {
      if (error.message.indexOf('as id to the store') > -1) {
        console.error(error);
        console.log("Redireccionando a /new (no se encontró la canción.)");
        return this.transitionTo('new');
      } else {
        console.error(error);
        alert(error);
        return this.transitionTo('index');
      }
    }
  }

});
