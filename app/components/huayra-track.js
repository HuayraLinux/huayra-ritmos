import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['huayra-track'],

  indexNumber: Ember.computed('index', function() {
    return this.get('index') + 1;
  }),

  trackName: Ember.computed('track.sound', function() {
    return this.get('track.sound').split('.')[0];
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
