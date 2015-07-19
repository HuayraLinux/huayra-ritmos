import Ember from 'ember';

export default Ember.Controller.extend({

  pattern: {},     // se cargan desde el setupcontroller de route:pattern
  player: {},      // se cargan desde el setupcontroller de route:pattern
  unsavedChanges: false,

  savedChanges: function() {
    return (!this.get('unsavedChanges'));
  }.property('unsavedChanges'),

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

  onClose() {

    if (this.get('unsavedChanges')) {
      this.send('showUnsavedChangesDialog');
    } else {
      var gui = window.requireNode('nw.gui');
      var win = gui.Window.get();
      win.close(true);
    }
  },

  actions: {
    save: function() {

      var record = JSON.stringify({player: this.get('player'), pattern: this.get('pattern')});
      var model = this.get('model').set('content', record);

      model.save().then(() => {
        this.set('unsavedChanges', false);
      });
    },

    newTrack: function() {
      this.showModal({
        template: 'modals/modal-new',
        controller: 'modal-new',
        model: this.get('pattern')
      });
    },

    onChange() {
      this.set('unsavedChanges', true);
    },

    showUnsavedChangesDialog() {
      this.showModal({
        template: 'modals/modal-confirm',
        controller: 'modal-confirm',
      });
    }
  }

});
