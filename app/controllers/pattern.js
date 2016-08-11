import Ember from 'ember';
import {service, inElectron} from '../service';

export default Ember.Controller.extend({
  //modelFactory: Ember.inject.service(),

  pattern: {},     // se cargan desde el setupcontroller de route:pattern
  player: {},      // se cargan desde el setupcontroller de route:pattern
  unsavedChanges: false,

  showConfirmModal: false,
  showEditTrack: false,
  currentModalTrack: undefined,
  model: undefined,
  exportar: service('exportar'),

  savedChanges: Ember.computed('unsavedChanges', function() {
    return (!this.get('unsavedChanges'));
  }),

  notifyEnterTransition() {
    if (inElectron) {
      var win = require('electron').remote.getCurrentWindow();

      win.on("close", (event) => {
        this.onClose(event);
      });
    }
  },

  notifyLeaveTransition() {
    if (inElectron) {
      var win = require('electron').remote.getCurrentWindow();

      win.removeAllListeners('close');
    }
  },

  forceCloseWindow() {
    var win = require('electron').remote.getCurrentWindow();
    win.destroy();
  },

  onClose(event) {

    if (this.get('unsavedChanges')) {
      this.send('showUnsavedChangesDialog', true);
      event.preventDefault();
    } else {
      this.forceCloseWindow();
    }
  },

  /* TODO: Hacer model una propiedad */
  updateModel() {
    let content = JSON.stringify({player: this.get('player'), pattern: this.get('pattern')});
    this.get('model').set('content', content);
    return this.get('model');
  },

  actions: {
    save() {
      var model = this.updateModel();

      model.save().then(() => {
        this.set('unsavedChanges', false);
      });
    },

    saveAs() {
      let removeModal = () => this.send('removeModal');

      return new Ember.RSVP.Promise((resolve, reject) => {
        this.send('showModal', 'modals/huayra-prompt', {
          title: 'Ingresa el nuevo título',
          cancel: reject,
          close: reject,
          accept: (title) => {
            var model = this.get('store').createRecord('pattern', {
                title: title,
                content: this.updateModel().get('content')
            });

            model.save().then(resolve, reject);
          }
        });
      }).then(removeModal, removeModal);
    },

    exportar() {
      let model = this.updateModel();
      this.get('exportar').guardar(model).then((file) => {
        p5.prototype.writeFile(file, model.get('title'), 'ritmo');
      });
    },

    removeTrack() {
      let tracks = this.get('pattern.tracks');
      let track = this.get('currentModalTrack');

      // Busca la posición del track para eliminar
      tracks.removeObject(track);

      this.send('onChange');
      this.send('closeEditTrackModal');
    },

    setTrackColor(color) {
      var track = this.get('currentModalTrack');
      Ember.set(track, "color", color);
    },

    closeEditTrackModal() {
      this.set('showEditTrack', false);
    },


    createNewTrackWithSound(sound) {
      var newTrack = {
        enabled: true,
        color: "verde",
        paint: false,
        sound: sound,
        steps: [
                  {active: false, variant: true}, { active: false, variant: true}, { active: false, variant: true}, { active: false, variant: true},
                  {active: false, variant: false}, { active: false, variant: false}, { active: false, variant: false}, { active: false, variant: false},
                  {active: false, variant: true}, { active: false, variant: true}, { active: false, variant: true}, { active: false, variant: true},
                  {active: false, variant: false}, { active: false, variant: false}, { active: false, variant: false}, { active: false, variant: false},
      ]};

      this.get('pattern.tracks').pushObject(newTrack);
      this.send('onChange');
    },

    newTrack() {
      this.transitionToRoute('pattern.newTrack');
    },

    editTrack(track) {
      this.set('currentModalTrack', track);
      this.set('showEditTrack', true);
    },

    onChange() {
      this.set('unsavedChanges', true);
    },

    goIndex() {
      if (this.get('unsavedChanges')) {
        this.send('showUnsavedChangesDialog', false);
      } else {
        this.transitionToRoute('index');
      }
    },

    closeConfirmModal() {
      this.set('showConfirmModal', false);
      this.set('currentModalTrack', undefined);
    },

    showUnsavedChangesDialog(mustCloseWindowOnDismiss) {
      this.set('mustCloseWindowOnDismiss', mustCloseWindowOnDismiss);
      this.set('showConfirmModal', true);
    },

    saveFromConfirmModal() {
      this.send('save');
      this.transitionToRoute('index');
    },

    cancelAndDontCloseFromConfirmModal() {
      this.send("closeConfirmModal");
    },

    cancelFromConfirmModal() {
      this.transitionToRoute('index');
    },

    saveAndCloseFromConfirmModal() {
      this.send('save');
      this.forceCloseWindow();
    },

    cancelAndCloseFromConfirmModal() {
      this.forceCloseWindow();
    },
  }
});
