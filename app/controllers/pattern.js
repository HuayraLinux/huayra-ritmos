import Ember from 'ember';

export default Ember.Controller.extend({
  pattern: {
    tracks: [
      {id: 11, steps: [{id: 1, enabled: true}, {id: 2, enabled: false}, {id: 3, enabled: false}, {id: 4, enabled: false}]},
      {id: 22, steps: [{id: 5, enabled: false}, {id: 6, enabled: false}, {id: 7, enabled: false}, {id: 8, enabled: false}]}
    ]
  },
});
