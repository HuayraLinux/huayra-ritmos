import Ember from 'ember';

export default Ember.Controller.extend({

  modelFactory: Ember.inject.service(),

  pattern: {},     // se cargan desde el setupcontroller de route:pattern
  player: {},      // se cargan desde el setupcontroller de route:pattern
  unsavedChanges: false,

  showConfirmModal: false,
  showEditTrack: false,
  currentModalTrack: undefined,

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
      this.send('showUnsavedChangesDialog', true);
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
    saveAs() {
      //var initial_record = this.get('modelFactory').get_initial_record();
      var record = JSON.stringify({player: this.get('player'), pattern: this.get('pattern')});
      var model = this.get('store').createRecord('pattern', {
          title: (prompt("Ingresa el nuevo título", 'sin título') || 'sin título'),
          content: record,
      });

      model.save();
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
    closeEditTrackModal(){
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
