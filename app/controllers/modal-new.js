import Ember from 'ember';

export default Ember.Controller.extend({
  selectedSound: null,

  emptySelection: Ember.computed('selectedSound', function() {
    return (! this.get('selectedSound'));
  }),

  actions: {
    onSelectSound(sound_id) {
      this.set('selectedSound', sound_id);
    },

    accept() {

      var newTrack = {
        enabled: true,
        color: "verde",
        paint: false,
        sound: this.get('selectedSound'),
        steps: [
                  {active: false, variant: true}, { active: false, variant: true}, { active: false, variant: true}, { active: false, variant: true},
                  {active: false, variant: false}, { active: false, variant: false}, { active: false, variant: false}, { active: false, variant: false},
                  {active: false, variant: true}, { active: false, variant: true}, { active: false, variant: true}, { active: false, variant: true},
                  {active: false, variant: false}, { active: false, variant: false}, { active: false, variant: false}, { active: false, variant: false},
      ]};

      this.get('modal.model.tracks').pushObject(newTrack);
      this.controllerFor('pattern').send('onChange');
    },

    acceptAndClose() {
      this.send('accept');
      this.send('closeModal');
    },

  },



});
