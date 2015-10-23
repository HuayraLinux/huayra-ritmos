import Ember from 'ember';

export default Ember.Controller.extend({
  selectedSound: null,
  
  actions: {
    onSelectSound(sound_id) {
      this.set('selectedSound', sound_id);
    },
  }
});
