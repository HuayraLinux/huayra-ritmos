import Ember from 'ember';

function onlyOnce(f) {
  let exec = false;
  return () => {
    if(exec) {
      return;
    }
    exec = true;
    return f();
  };
}

export default Ember.Component.extend({
  audio: Ember.inject.service(),
  classNames: ['step', 'step-default', 'huayra-step'],

  classNameBindings: ['active:step-active', 'active:step-success', //estados para el step seleccionado
                      'variant:step-variant', // estado para indicar que es una variante de la cuarta.
                      'playing:step-playing',
                      'disabled'
                      ],
  activeBinding: "step.active",
  variantBinding: "step.variant",
  disabledBinding: "step.disabled",

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
      this.set('step.active', track.chequear);
      this.sendAction('onChange');
    }
  },
  didInsertElement: function() {
    var track = this.get('track');
    var step = this.$();

    step.on('mousedown', () => {
      let endDrag = onlyOnce(() => {
          Ember.set(track, "paint", false);
      });
      Ember.set(track, "paint", true);
      /* Setea la intención del drag */
      Ember.set(track, "chequear", !this.get('step.active'));
      $(window).one('mouseup', endDrag);
      $(window).one('blur', endDrag);
    });
  },
  willDestroyElement() {
    var step = this.$();
    step.off('mousedown');
  }

});
