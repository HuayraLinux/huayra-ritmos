import Ember from 'ember';

export default Ember.Route.extend({

    _get_initial_record() {
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


  activate() {

          var initial_record = this._get_initial_record();
          var record = this.get('store').createRecord('pattern', {
            title: "Sin título",
            content: JSON.stringify(initial_record),
          });

          this.transitionTo('pattern', record);

  }
});
