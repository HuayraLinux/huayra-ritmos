import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['huayra-new-track-container'],
  pattern: null,

  actions: {
    newTrack() {
      this.sendAction('onNewTrack');
    }
  }
});
