import Ember from 'ember';

export default Ember.Component.extend({
  active_id: null,
  classNames: ['ember-sound-selector'],
  

  loadSounds: function() {
    var fs = window.requireNode('fs');

    var files = fs.readdirSync('dist/sounds').filter((e) => {
      return e.indexOf('.wav') > 0;
    });

    files.forEach((name) => {
      let title = name.replace('.wav', '');
      this.sounds.pushObject({id: name, title: title});
    });

  }.on('init'),

  sounds: [],

  actions: {
    select(sound) {
      this.set('active_id', sound.id);
      this.sendAction('onSelect', sound.id);
    }
  }

});
