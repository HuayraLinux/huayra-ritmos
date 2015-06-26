import Ember from 'ember';

export default Ember.Service.extend({

  loadSounds: function() {
    boombox.setup();

    this.loadSound('000_drum1.wav');
    this.loadSound('002_drum3.wav');

  }.on('init'),

  loadSound: function(name) {
    var path = "/sounds/" + name;

    var options = {
      src: [{
            media: 'audio/mp4',
            path: path,
        }]
    };

    console.log('cargando sonido ' + name);
    
    boombox.load(name, options, function (err, audio) {
      console.log("err", err);
      console.log("audio", audio);
    });

  },

  play: function(name) {
    boombox.get(name).play();
  }
});
