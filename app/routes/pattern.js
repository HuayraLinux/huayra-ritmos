import Ember from 'ember';
import {service} from '../service';

export default Ember.Route.extend({
  menu: service('menu'),
  audio: Ember.inject.service(),
  modelFactory: Ember.inject.service(),
  soundGallery: service('sound-gallery'),
  history: Ember.inject.service(),

  onInit: Ember.on('init', function() {
    let sendToController = (action) => this.controllerFor('pattern').send(action);
    this.get('menu').on('guardar',      () => sendToController('save'));
    this.get('menu').on('guardar_como', () => sendToController('saveAs'));
    this.get('menu').on('exportar',     () => sendToController('exportar'));
    this.get('menu').on('cerrar',       () => sendToController('goIndex'));
  }),

  model(params) {
    // Intenta cargar el modelo desde el ID de la URL o
    // directamente contruye un track nuevo.
    return new Ember.RSVP.Promise((success) => {

      this.store.findRecord('pattern', params.pattern_id).
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

   // hack temporal para hacer la transicion de player.bpm a pattern.bpm
   //record.pattern.bpm = record.pattern.bpm || (record.player.bpm || 120);
   if( record.pattern.bpm === undefined){
     if( record.player.bpm === undefined ){
       record.pattern.bpm = 120;
     }
     else{
       record.pattern.bpm = record.player.bpm;
     }
   }
   // else{ mantene los bpm }

    controller.set('player', record.player);
    controller.set('pattern', record.pattern);
    controller.set('model', model);
    controller.set('showConfirmModal', false);
    controller.set('showEditTrack', false);
    controller.set('currentModalTrack', undefined);
    controller.set('unsavedChanges', false);

    controller.notifyEnterTransition();
    //document.title = model._data.title || "Sin título";

    this.get("history").visit(this.get('routeName'), model);
  },

  deactivate() {
    this.controllerFor('pattern').notifyLeaveTransition();
  },

  activate() {
    this.get('audio');
    this.get('settings');

    this.get('menu').pattern();
  },
  afterModel() {
    return this.get('soundGallery').loadSounds();
  }

});
