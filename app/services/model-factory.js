import Ember from 'ember';

export default Ember.Service.extend({
  get_initial_record() {
    return {

        player: {
          currentStep: 0,
          bpm: 120,
          playing: false,
        },

        pattern: {
          tracks: [
            { enabled: true,
              paint: false,
              color: "verde",
              sound: '000_drum1.wav',
              volume: 1,
              steps: [
                        {active: false, variant: true}, { active: false, variant: true}, { active: false, variant: true}, { active: false, variant: true},
                        {active: false, variant: false}, { active: false, variant: false}, { active: false, variant: false}, { active: false, variant: false},
                        {active: false, variant: true}, { active: false, variant: true}, { active: false, variant: true}, { active: false, variant: true},
                        {active: false, variant: false}, { active: false, variant: false}, { active: false, variant: false}, { active: false, variant: false},
                     ]},
            { enabled: true,
              paint: false,
              color: "amarillo",
              sound: '002_drum3.wav',
              volume: 1,
              steps: [
                        {active: false, variant: true}, { active: false, variant: true}, { active: false, variant: true}, { active: false, variant: true},
                        {active: false, variant: false}, { active: false, variant: false}, { active: false, variant: false}, { active: false, variant: false},
                        {active: false, variant: true}, { active: false, variant: true}, { active: false, variant: true}, { active: false, variant: true},
                        {active: false, variant: false}, { active: false, variant: false}, { active: false, variant: false}, { active: false, variant: false},
                    ]},
          ]
        },
      };
  },
  
});
