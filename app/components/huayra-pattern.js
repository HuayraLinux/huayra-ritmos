import Ember from 'ember';

export default Ember.Component.extend({
  pattern: null,

  lonelyTrack: Ember.computed('pattern.tracks.length', function() {
    return this.get('pattern.tracks.length') < 2;
  }),

  actions: {
    onChange() {
      this.sendAction('onChange');
    },

    onEditTrack(track) {
      this.sendAction('onEditTrack', track);
    }
  }
});
