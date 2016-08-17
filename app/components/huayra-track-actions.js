import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['huayra-track-actions'],
  itsEmpty: false,
  onChange: null,
  onRemove: null,
  isLastTrack: false,

  actions: {
    clean() {
      var track = this.get('track');

      track.steps.forEach((s) => {
        Ember.set(s, "active", false);
      });

      this.sendAction('onChange');
    },
    remove() {
      this.sendAction('onRemove', this.get('track'));
    }
  },
});
