import Ember from 'ember';

export default Ember.Service.extend({
  settings: Ember.inject.service(),
  soundGallery: Ember.inject.service(),

  play(sound, volume, rate) {
    volume = volume || 1;
    rate = rate || 1;

    var audioClip = this.get('soundGallery').getAudioClip(sound);

    audioClip.setVolume(volume);
    audioClip.rate(rate);
    audioClip.play(0, rate);
  },

  previewSound(sound) {
    this.play(sound);
  }
});
