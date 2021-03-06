import Ember from 'ember';
import {service, inElectron} from '../service';

export default Ember.Controller.extend({
  //modelFactory: Ember.inject.service(),

  pattern: {},     // se cargan desde el setupcontroller de route:pattern
  player: {},      // se cargan desde el setupcontroller de route:pattern
  unsavedChanges: false,

  inBrowser: !inElectron,

  showConfirmModal: false,
  showEditTrack: false,
  currentModalTrack: undefined,
  model: undefined,
  modal: Ember.inject.service(),
  exportar: service('exportar'),

  savedChanges: Ember.computed('unsavedChanges', function() {
    return (!this.get('unsavedChanges'));
  }),

  notifyEnterTransition() {
    // if (inElectron) {
    //   var win = require('electron').remote.getCurrentWindow();

    //   win.on("close", (event) => {
    //     this.onClose(event);
    //   });
    // }
    window.onbeforeunload = (e) => {
      this.onClose(e);
    };
  },

  notifyLeaveTransition() {
    // if (inElectron) {
    //   var win = require('electron').remote.getCurrentWindow();

    //   win.removeAllListeners('close');
    // }
    window.onbeforeunload = null;
  },

  forceCloseWindow() {
    var win = require('electron').remote.getCurrentWindow();
    win.destroy();
  },

  onClose(e) {
    if (this.get('unsavedChanges')) {
      this.send('showUnsavedChangesDialog', true);
      e.returnValue = false; /* Cancelo la salida */
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

  save() {
    var model = this.updateModel();
    return model.save()
      .then(() => this.set('unsavedChanges', false));
  },

  /* TODO: Meter esto y un par de cosas así en una lib posta de utilidades modales */

  actions: {
    save() {
      this.save();
    },

    saveAs() {
      let validar = (titulo) =>
        this.get('modal').validarTitulo(titulo);

      let notas = (titulo) =>
        this.get('modal').validarTitulo(titulo)
          .then((valido) => valido ? '' : 'Ya hay un proyecto con ese nombre');

      return this.get('modal').prompt('Ingresá un nuevo título', validar, notas).then((title) => {
        let model = this.get('store').createRecord('pattern', {
          title: title,
          content: this.updateModel().get('content')
        });
        let goToNewPattern = () => this.transitionToRoute('pattern', model);

        return model.save()
          .then(goToNewPattern);
      });
    },

    exportar() {
      let model = this.updateModel();
      this.get('exportar').guardar(model).then((file) => {
        p5.prototype.writeFile(file, model.get('title'), 'ritmo');
      });
    },

    removeTrack(track) {
      let tracks = this.get('pattern.tracks');

      // Busca la posición del track para eliminar
      tracks.removeObject(track);

      this.send('onChange');
      this.send('closeEditTrackModal');
    },

    saveTrack(track, diff) {
      Ember.set(track, 'volume', diff.volume);
      Ember.set(track, 'sound', diff.sound);
      Ember.set(track, 'color', diff.color);
      /* Podríamos de verdad chequear si algo cambió */
      this.send('onChange');
      this.send('closeEditTrackModal');
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
      this.save().then(() => this.transitionToRoute('index'));
    },

    cancelAndDontCloseFromConfirmModal() {
      this.send("closeConfirmModal");
    },

    cancelFromConfirmModal() {
      this.transitionToRoute('index');
    },

    saveAndCloseFromConfirmModal() {
      this.save().then(() => this.forceCloseWindow());
    },

    cancelAndCloseFromConfirmModal() {
      this.forceCloseWindow();
    },
  }
});
