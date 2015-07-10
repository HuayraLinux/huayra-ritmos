import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    accept: function() {

      var newTrack = {
        enabled: true,
        paint: false,
        sound: '000_drum1.wav',
        steps: [
                  {active: false, variant: true}, { active: false, variant: true}, { active: false, variant: true}, { active: false, variant: true},
                  {active: false, variant: false}, { active: false, variant: false}, { active: false, variant: false}, { active: false, variant: false},
                  {active: false, variant: true}, { active: false, variant: true}, { active: false, variant: true}, { active: false, variant: true},
                  {active: false, variant: false}, { active: false, variant: false}, { active: false, variant: false}, { active: false, variant: false},
      ]};

      this.get('modal.model.tracks').pushObject(newTrack);

      this.send('closeModal');
    }
  }
});
