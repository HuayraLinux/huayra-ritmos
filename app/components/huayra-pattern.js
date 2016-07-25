import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    onChange() {
      this.sendAction('onChange');
    },

    onEditTrack(track) {
      this.sendAction('onEditTrack', track);
    }
  }
});
