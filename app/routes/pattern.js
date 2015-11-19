import Ember from 'ember';

export default Ember.Route.extend({
  audio: Ember.inject.service(),
  modelFactory: Ember.inject.service(),
  soundGallery: Ember.inject.service(),

  model(params) {
    // Intenta cargar el modelo desde el ID de la URL o
    // directamente contruye un track nuevo.
    return new Ember.RSVP.Promise((success) => {

      this.store.find('pattern', params.pattern_id).
        then((model) => {
          success(model);
        }).
        catch(() => {
          var initial_record = this.get('modelFactory').get_initial_record();
          var record = this.get('store').createRecord('pattern', {
            title: "Sin título",
            content: JSON.stringify(initial_record),
          });

          success(record);
        });
    });
  },

  setupController(controller, model) {
    var record = JSON.parse(model.get('content'));

    controller.set('player', record.player);
    controller.set('pattern', record.pattern);
    controller.set('model', model);
    controller.set('showConfirmModal', false);
    controller.set('unsavedChanges', false);
    
    controller.notifyEnterTransition();
  },

  deactivate() {
    this.controllerFor('pattern').notifyLeaveTransition();
  },

  activate() {
    this.get('audio');
  },

  afterModel() {
    return this.get('soundGallery').loadSounds();
  }

});
