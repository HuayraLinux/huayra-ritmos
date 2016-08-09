import Ember from 'ember';
import service from '../service';

export default Ember.Service.extend({
  settings: service('settings'),
  soundGallery: service('soundGallery'),

  play(sound, volume, rate, when) {
    volume = volume || 1;
    rate = rate || 1;
    when = when || 0;
    var sound_cat_file = sound.split("/").reverse().slice(0,2).reverse().join("/");
    var audioClip = this.get('soundGallery').getAudioClip(sound_cat_file);

    audioClip.setVolume(volume);
    audioClip.rate(rate);
    audioClip.play(when, rate);
  },

  previewSound(sound) {
    // como recibimos un objeto, nos quedamos con la url del archivo
    sound = sound.audioClip.file;
    // pero como estan guardados en categorias/items, nos quedamos solo
    // con esa parte de la url del archivo
    sound = sound.split("/").reverse().slice(0,2).reverse().join("/");
    this.play(sound);
  }
});
