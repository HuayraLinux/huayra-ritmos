import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['step', 'step-success', 'huayra-step'],
  step: null,

  mouseDown: function() {
      var step = this.get('step');
      console.log(step);
      step.set('enabled', true);
  },

});
