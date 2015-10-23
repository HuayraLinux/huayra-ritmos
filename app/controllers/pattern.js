import Ember from 'ember';

export default Ember.Controller.extend({

  pattern: {},     // se cargan desde el setupcontroller de route:pattern
  player: {},      // se cargan desde el setupcontroller de route:pattern
  unsavedChanges: false,

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
      let options = {
        callback_ok: () => {
          this.send('save');
        },
        callback_cancel: () => {
          this.forceCloseWindow();
        }
      };

      this.send('showUnsavedChangesDialog', options);
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


    newTrack() {
      this.transitionToRoute('pattern.newTrack');

      /*
      this.showModal({
        template: 'modals/modal-new',
        controller: 'modal-new',
        model: this.get('pattern')
      });
      */
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
        let options = {
          callback_ok: () => {
            this.send('save');
            this.transitionToRoute('index');
          },
          callback_cancel: () => {
            this.transitionToRoute('index');
          }
        };

        this.send('showUnsavedChangesDialog', options);
      } else {
        this.transitionToRoute('index');
      }
    },

    showUnsavedChangesDialog(options) {
      this.showModal({
        template: 'modals/modal-confirm',
        controller: 'modal-confirm',
        model: options
      });
    }
  }

});
