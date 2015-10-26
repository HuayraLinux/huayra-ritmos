import Ember from 'ember';

export default Ember.Component.extend({
  active_id: null,
  classNames: ['ember-sound-selector'],
  audio: Ember.inject.service(),
  settings: Ember.inject.service(),
  sounds: [],

  alertIfNoSounds: Ember.on('init', () => {
    if (this.get('sounds').length === 0) {
      alert("Hey, no hay sonidos en la galería...");
    }
  }),
  
  actions: {
    select(sound) {
      this.set('active_id', sound.id);
      this.sendAction('onSelect', sound.id);
      this.get('audio').previewSound(sound.id);
    }
  }

});
