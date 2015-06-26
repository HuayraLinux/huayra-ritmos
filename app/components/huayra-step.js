import Ember from 'ember';

export default Ember.Component.extend({
  boombox: Ember.inject.service(),
  classNames: ['step', 'step-default', 'huayra-step'],

  classNameBindings: ['active:step-active', 'active:step-success', //estados para el step seleccionado
                      'variant:step-variant', // estado para indicar que es una variante de la cuarta.
                      'playing:step-playing'
                      ],
  activeBinding: "step.active",
  variantBinding: "step.variant",

  playing: function() {
    return (this.get('currentStep') === this.get('index'));
  }.property('currentStep'),

  step: null,
  sound: null,

  index: null,
  currentStep: null,

  mouseDown: function() {
      this.toggleProperty('step.active');
      this.get('boombox').play(this.get('sound'));
  },

});
