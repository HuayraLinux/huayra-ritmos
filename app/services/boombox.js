import Ember from 'ember';

export default Ember.Service.extend({

  loadSounds: Ember.on('init', function() {
    var isNodeWebkit = (typeof process === "object");

    if (isNodeWebkit) {
      var fs = window.requireNode('fs');
      boombox.setup();

      var files = fs.readdirSync('dist/sounds').filter(function(e) {return e.indexOf('.wav') > 0;});

      files.forEach((name) => {
        this.loadSound(name);
      });
    } else {
      this.loadSound('/huayra-ritmos/sounds/000_drum1.wav');
      this.loadSound('/huayra-ritmos/sounds/002_drum3.wav');
    }

  }),

  loadSound(name) {
    var path = "app://./dist/sounds/" + name;

    var options = {
      src: [{
            media: 'audio/mp4',
            path: path,
        }]
    };

    console.log('cargando sonido ' + name);

    boombox.load(name, options, function (err, audio) {
      if (err) {
        console.log("err", err);
        console.log("audio", audio);
      }
    });

  },

  play(name) {
    boombox.get(name).play();
  },

  previewSound(name) {
    this.play(name);
  }
});
