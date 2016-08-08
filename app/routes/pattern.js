import Ember from 'ember';
import service from '../service';

let isNodeWebkit = false;

export default Ember.Route.extend({
  menu: service('menu'),
  audio: Ember.inject.service(),
  modelFactory: Ember.inject.service(),
  soundGallery: service('sound-gallery'),
  history: Ember.inject.service(),

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
    var patternController = this.controllerFor("pattern");
    var appController = this.controllerFor("application");

    if (isNodeWebkit) {
      this.get('menu').pattern();
      this.get('menu').itemGuardar.click     = function () { patternController.send('save'); };
      this.get('menu').itemGuardarComo.click = function () { patternController.send('saveAs'); };
      this.get('menu').itemExportar.click    = function () { patternController.send('exportar'); };
      this.get('menu').itemCerrar.click      = function () { patternController.send('goIndex'); };
      this.get('menu').itemAcercaDe.click    = function () { appController.send('showAboutModal'); };
    }

  },
  afterModel() {
    return this.get('soundGallery').loadSounds();
  }

});
