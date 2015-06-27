import Ember from 'ember';


export default Ember.Component.extend({
  classNames: ['huayra-player'],
  pattern: null,
  player: null,

  boombox: Ember.inject.service(),
  playing: false,
  timer: null,

  connectKeyHandlers: function() {
    this.set('eventHandler', this.keyHandler.bind(this));
    this.$(document).bind('keydown', this.get('eventHandler'));
  }.on('didInsertElement'),

  disconnectKeyHandlers: function() {
    this.$(document).unbind('keydown', this.get('eventHandler'));
  }.on('willClearRender'),

  keyHandler: function(e) {
    // Si es la tecla SPACE
    if (e.keyCode === 32) {
      this.send('togglePlay');
    }
  },



  play: function() {
    this.playStep();
  },

  playCurrentStepSound() {
    var currentStep = this.get('player.currentStep');
    var tracks = this.get('pattern.tracks');

    tracks.forEach((t) => {

      if (t.enabled) {
        if (t.steps[currentStep].active) {
          this.get('boombox').play(t.sound);
        }
      }

    });
  },

  playStep: function() {
    var delay = 1000 / this.get('player.bpm');

    this.playCurrentStepSound();

    var timer = Ember.run.later(() => {
      this.incrementProperty('player.currentStep');

      if (this.get('player.currentStep') > 15) {
        this.set('player.currentStep', 0);
      }

      this.playStep();
    }, delay);

    this.set('timer', timer);
  },

  stop: function() {
    this.set('player.currentStep', 0);

    if (this.get('timer')) {
      Ember.run.cancel(this.get('timer'));
      this.set('timer', null);
    }
  },

  actions: {
    togglePlay: function() {
      this.toggleProperty('playing');

      if (this.get('playing')) {
        this.set('player.playing', true);
        this.play();
      } else {
        this.set('player.playing', false);
        this.stop();
      }

    }
  }
});
