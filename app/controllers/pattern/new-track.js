import Ember from 'ember';

export default Ember.Controller.extend({
  pattern: Ember.inject.controller(),
  selectedSound: null,

  emptySelection: Ember.computed('selectedSound', function() {
    return (! this.get('selectedSound'));
  }),

  actions: {
    onSelectSound(sound) {
      this.set('selectedSound', sound.audioClip.file.replace(/^sounds\//,""));
    },
    accept() {
      var controller = this.get('pattern');
      controller.send('createNewTrackWithSound', this.get('selectedSound'));
      this.set('selectedSound', null);
    },
    acceptAndClose() {
      this.send('accept');
      this.send('close');
    },
    discardAndClose() {
      this.send('close');
    },

    selectCategory(category) {
      alert("category " + category);
    }
  }
});
