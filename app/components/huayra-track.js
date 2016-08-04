import Ember from 'ember';

/*
 * TODO: Si el archivo tiene un nombre del estilo
 * "soy.un.gran.archivo" la función devuelve "soy"
 */
function filenameFromPath(path) {
  return /(?:[^\/]*\/)*([^\/\.]*)/.exec(path)[1];
}

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

    return filenameFromPath(track_sound);
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
