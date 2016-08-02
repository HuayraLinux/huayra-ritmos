import Ember from 'ember';

var path = requireNode('path');

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

    return path.parse(track_sound).name;
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
