import Ember from 'ember';

export default Ember.Controller.extend({
  test: 123,
  pattern: {
    tracks: [
      {id: 123, steps: [{id: 1}, {id: 2}, {id: 3}, {id: 4}]},
      {id: 333, steps: [{id: 61}, {id: 62}, {id: 63}, {id: 64}]}
    ]
  },

  disableBackSpace: function() {
    Ember.$(document).on("keydown", function (e) {
      if (e.which === 8 && !Ember.$(e.target).is("input, textarea")) {
          e.preventDefault();
      }
    });
  }.on('init')

});
