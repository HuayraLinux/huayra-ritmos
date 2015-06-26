import Ember from 'ember';

export default Ember.Service.extend({
  loadSounds: function() {

    this.sounds = {
      '000_drum1.wav': 'public/000_drum1.wav',
      '002_drum3.wav': 'public/002_drum3.wav',
    };
    

  }.on('init')
});
