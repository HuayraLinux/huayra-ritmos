import Ember from 'ember';

export default Ember.Service.extend({
  get_initial_record() {
    return {

        player: {
          currentStep: 0,
          bpm: 120,
          playing: false,
          stepsLimit: 16,
        },

        pattern: {
          bpm: 120,
          tracks: [
            { enabled: true,
              paint: false,
              color: "verde",
              sound: 'sounds/basicos/000_drum1.wav',
              volume: 1,
              steps: [
                        {active: false, variant: true, disabled:false}, { active: false, variant: true, disabled:false}, { active: false, variant: true, disabled:false}, { active: false, variant: true, disabled:false},
                        {active: false, variant: false, disabled:false}, { active: false, variant: false, disabled:false}, { active: false, variant: false, disabled:false}, { active: false, variant: false, disabled:false},
                        {active: false, variant: true, disabled:false}, { active: false, variant: true, disabled:false}, { active: false, variant: true, disabled:false}, { active: false, variant: true, disabled:false},
                        {active: false, variant: false, disabled:false}, { active: false, variant: false, disabled:false}, { active: false, variant: false, disabled:false}, { active: false, variant: false, disabled:false},
                     ]},
            { enabled: true,
              paint: false,
              color: "amarillo",
              sound: 'sounds/basicos/002_drum3.wav',
              volume: 1,
              steps: [
                        {active: false, variant: true, disabled:false}, { active: false, variant: true, disabled:false}, { active: false, variant: true, disabled:false}, { active: false, variant: true, disabled:false},
                        {active: false, variant: false, disabled:false}, { active: false, variant: false, disabled:false}, { active: false, variant: false, disabled:false}, { active: false, variant: false, disabled:false},
                        {active: false, variant: true, disabled:false}, { active: false, variant: true, disabled:false}, { active: false, variant: true, disabled:false}, { active: false, variant: true, disabled:false},
                        {active: false, variant: false, disabled:false}, { active: false, variant: false, disabled:false}, { active: false, variant: false, disabled:false}, { active: false, variant: false, disabled:false},
                    ]},
          ]
        },
      };
  },

});
