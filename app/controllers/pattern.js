import Ember from 'ember';

export default Ember.Controller.extend({

  pattern: {},     // se cargan desde el setupcontroller de route:pattern
  player: {},      // se cargan desde el setupcontroller de route:pattern
  unsavedChanges: false,

  showConfirmModal: false,
  queryParams: ["showConfirmModal"],


  savedChanges: Ember.computed('unsavedChanges', function() {
    return (!this.get('unsavedChanges'));
  }),

  notifyEnterTransition() {
    var gui = window.requireNode('nw.gui');
    var win = gui.Window.get();

    win.on("close", () => {
      this.onClose.call(this);
    });
  },

  notifyLeaveTransition() {
    var gui = window.requireNode('nw.gui');
    var win = gui.Window.get();

    win.removeAllListeners('close');
  },

  forceCloseWindow() {
    var gui = window.requireNode('nw.gui');
    var win = gui.Window.get();
    win.close(true);
  },

  onClose() {

    if (this.get('unsavedChanges')) {
      this.send('showUnsavedChangesDialog');
    } else {
      this.forceCloseWindow();
    }
  },

  actions: {
    save() {

      var record = JSON.stringify({player: this.get('player'), pattern: this.get('pattern')});
      var model = this.get('model').set('content', record);

      model.save().then(() => {
        this.set('unsavedChanges', false);
      });
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
      let model = {
        pattern: this.get('pattern'),
        track: track,
      };

      this.showModal({
        template: 'modals/modal-track',
        controller: 'modal-track',
        model: model
      });
    },

    onChange() {
      this.set('unsavedChanges', true);
    },

    goIndex() {
      if (this.get('unsavedChanges')) {
        this.send('showUnsavedChangesDialog');
      } else {
        this.transitionToRoute('index');
      }
    },

    closeConfirmModal() {
      this.set('showConfirmModal', false);
    },

    showUnsavedChangesDialog() {
      this.set('showConfirmModal', true);
    },

    saveFromConfirmModal() {
      this.send('save');
      this.transitionToRoute('index');
    },

    cancelFromConfirmModal() {
      
    },

/*
    let options = {
      callback_ok: () => {
      },
      callback_cancel: () => {
        this.forceCloseWindow();
      }
    };

    let options = {
      callback_ok: () => {
        this.send('save');
        this.transitionToRoute('index');
      },
      callback_cancel: () => {
        this.transitionToRoute('index');
      }
    };
*/


  }

});
