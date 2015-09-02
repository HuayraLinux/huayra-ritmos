import Ember from 'ember';

export default Ember.Component.extend({
  audio: Ember.inject.service(),
  classNames: ['step', 'step-default', 'huayra-step'],

  classNameBindings: ['active:step-active', 'active:step-success', //estados para el step seleccionado
                      'variant:step-variant', // estado para indicar que es una variante de la cuarta.
                      'playing:step-playing'
                      ],
  activeBinding: "step.active",
  variantBinding: "step.variant",

  playing: Ember.computed('player.currentStep', 'player.playing', function() {
    return (this.get('player.playing') && (this.get('player.currentStep') === this.get('index')));
  }),

  step: null,
  sound: null,

  index: null,
  player: null,

  mouseDown() {
      this.toggleProperty('step.active');

      // Solo reproduce cuando se hace click pero no está
      // reproduciendo.
      if (! this.get('player.playing')) {
        this.get('audio').play(this.get('sound'));
      }

      this.sendAction('onChange');
  },

  mouseEnter() {
    var track = this.get('track');
    if (track.paint) {
      this.toggleProperty('step.active');
      this.sendAction('onChange');
    }
  },

});
