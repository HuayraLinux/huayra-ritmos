import Ember from 'ember';
import {service} from '../service';

export default Ember.Service.extend({
  settings: service('settings'),
  soundGallery: service('soundGallery'),

  play(sound, volume = 1, rate = 1, when = 0) {
    var audioClip;
    if(typeof(sound) === "string") {
      var sound_cat_file = sound.split("/").slice(-2).join("/");
      audioClip = this.get('soundGallery').getAudioClip(sound_cat_file);
    } else {
      audioClip = sound.audioClip;
    }

    audioClip.setVolume(volume);
    audioClip.rate(rate);
    audioClip.play(when, rate);
  },

  previewSound(sound) {
    this.play(sound);
  }
});
