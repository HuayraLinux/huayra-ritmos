import Ember from 'ember';

export default Ember.Controller.extend({
  selectedSound: null,

  emptySelection: Ember.computed('selectedSound', function() {
    return (! this.get('selectedSound'));
  }),

  actions: {
    onSelectSound(sound_id) {
      this.set('selectedSound', sound_id);
    },
    accept() {
      var controller = this.controllerFor('pattern');
      controller.send('createNewTrackWithSound', this.get('selectedSound'));
    },
    acceptAndClose() {
      this.send('accept');
      this.send('close');
    }
  }
});
