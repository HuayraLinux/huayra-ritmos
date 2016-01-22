import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['huayra-track'],

  indexNumber: Ember.computed('index', function() {
    return this.get('index') + 1;
  }),

  trackName: Ember.computed('track.sound', function() {
    var track_sound = this.get('track.sound');

    if( typeof(this.get('track.sound')) === "object" ){
      track_sound = this.get('track.sound').audioClip.file.replace(/^sounds\//,"");
    }

    return track_sound.split('.')[0].split('/')[1];
  }),

  trackColor: Ember.computed('track.color', function() {
    return "huayra-track-"+this.get('track.color');
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
