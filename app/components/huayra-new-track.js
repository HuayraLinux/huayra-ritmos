import Ember from 'ember';

export default Ember.Component.extend({
  pattern: null,

  actions: {
    newTrack() {
      this.sendAction('onNewTrack');
    }
  }
});
