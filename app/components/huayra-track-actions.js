import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['huayra-track-actions'],
  itsEmpty: false,

  actions: {
    clean() {
      var track = this.get('track');

      track.steps.forEach((s) => {
        Ember.set(s, "active", false);
      });

      this.sendAction('onChange');
    },

    pintar() {
      var track = this.get('track');
      Ember.set(track, "paint", !track.paint);
    }
  },
});
