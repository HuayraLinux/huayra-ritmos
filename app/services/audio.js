import Ember from 'ember';

export default Ember.Service.extend({
  settings: Ember.inject.service(),
  sounds: {},

  init() {
    window.setup = () => {
      this.set('analyzer', new p5.Amplitude());

      this.loadSounds();

      //this.set('sounds.coin', loadSound('sounds/coin.wav' /* , [onload_callback], [progress_callback] */));
      //this.set('sounds.golpe', loadSound('sounds/golpe.wav'));
    };

    /*
    window.draw = () => {
      this.set('amplitude', this.get('analyzer').getLevel());
      noLoop();
    };
    */

    new p5();
  },

  loadSounds: Ember.on('init', function() {
    var isNodeWebkit = (typeof process === "object");

    if (isNodeWebkit) {
      var fs = window.requireNode('fs');

      var prefix = this.get('settings').getPrefix();
      var is_sound = function(e) {return e.indexOf('.wav') > 0;};
      var files = fs.readdirSync(`${prefix}sounds`).filter(is_sound);

      files.forEach((name) => {
        this.loadSound(prefix, name);
      });
    } else {
      this.loadSound('', '/huayra-ritmos/sounds/000_drum1.wav');
      this.loadSound('', '/huayra-ritmos/sounds/002_drum3.wav');
    }

  }),

  loadSound(prefix, name) {
    //var path = `app://./${prefix}sounds/${name}`;
    var main_path = process.cwd();
    var path = `file://${main_path}/${prefix}sounds/${name}`;

    console.log('cargando sonido ' + name, path);
    //this.sounds[name] = new Wad({source : path});
    this.sounds[name] = loadSound(path);
  },

  play(name, volume, rate) {
    volume = volume || 1;
    rate = rate || 1;

    this.sounds[name].setVolume(volume);
    //this.sounds[name].rate(rate);
    this.sounds[name].play(0, rate);
  },

  previewSound(name) {
    this.play(name);
  }
});
