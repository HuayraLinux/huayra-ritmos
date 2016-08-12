import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['huayra-player'],
  pattern: null,
  player: null,
  recordTitle: null,

  audio: Ember.inject.service(),
  playing: false,
  timer: null,

  connectKeyHandlers: Ember.on('didInsertElement', function() {
    this.set('eventHandler', this.keyHandler.bind(this));
    this.$(document).bind('keydown', this.get('eventHandler'));
  }),

  disconnectKeyHandlers: Ember.on('willClearRender', function() {
    this.stop();
    this.$(document).unbind('keydown', this.get('eventHandler'));
  }),

  keyHandler(e) {

    // Si es la tecla SPACE
    if (e.keyCode === 32) {
      this.send('togglePlay');
    }

    // Permite usar las teclas 1, 2, 3 ... 9 para habilitar o deshabilitar
    // los tracks inividualmente.
    if (e.keyCode >= 49 && e.keyCode <= 57) {
      this.send('toggleEnabledTrackByIndex', e.keyCode - 48);
    }

  },

  play() {
    this.audioTimer();
  },

  audioTimer(step, ultimoMomento/*CRONICA TV*/, esperando) {
    /* Default values */
    step = step || 0;
    ultimoMomento = ultimoMomento || getAudioContext().currentTime;
    esperando = esperando || [];
    /* Tiempo que encolo en WebAudio (s) */
    let buffer = 0.150;
    /* Tiempo actual */
    let ahora = getAudioContext().currentTime;
    /* Tiempo que falta (o pasó) desde la última nota scheduleada (s)*/
    let falta = ultimoMomento - ahora;
    /* Momento en el cual termina el buffer (s) */
    let bufferEndTime = buffer - falta;
    /* Delay con el que llamo la función (ms) */
    let delay = 25;
    /* Tiempo entre steps (s) */
    let intervalo = 60 / ((this.get('pattern.bpm') || 120) * 4);
    /* Steps del proyecto */
    let steps = this.get('player.stepsLimit') || 16;

    /* Proceso los eventos y los descarto, procesarEventos
     * devuelve la cantidad procesada (y `esperando` está ordenado
     * cronológicamente)
     */
    let procesados = this.procesarEventos(esperando, ahora);

    /* Basado en http://www.html5rocks.com/en/tutorials/audio/scheduling/#toc-rocksolid */
    let momento = falta;
    while(momento < bufferEndTime) {
      /* Encolo lo necesario */
      this.encolar(step, momento);

      /* Lo dejo en la lista de cosas que espero */
      esperando.push([ahora + momento, step]);

      /* Avanzo un step */
      momento += intervalo;
      step = (step + 1) % steps;
    }

    let timer = Ember.run.later(
      this, /* Contexto, el this con el que se ejecuta */
      this.audioTimer, /* Esta misma funcion */
      step,                        /* Argumento: Último step procesado */
      ahora + momento,             /* Argumento: Último momento procesado */
      esperando.slice(procesados), /* Argumento: Eventos sin procesar */
      delay /* El delay con el que se ejecute el timer */
    );

    this.set('timer', timer);
  },

  procesarEventos(esperando, ahora) {
    /* Me fijo todos los eventos que hay que procesar y los proceso */
    let eventos = esperando.filter((evento) => evento[0] < ahora);
    /* El último es el último step reproducido*/
    eventos.forEach((evento) => this.set('player.currentStep', evento[1]));
    return eventos.length;
  },

  encolar(step, momento) {
    var tracks = this.get('pattern.tracks');

    tracks.filter((t) => t.enabled)
          .filter((t) => t.steps[step].active)
          .forEach((t) => {
            let volume = t.volume || 1;            // aplica el volumen global.
            volume = parseFloat(volume, 10);
            volume *= (t.steps[step].volume || 1); // aplica el volumen del step.
            this.get('audio').play(t.sound, volume, undefined, momento);
          });
  },

  stop() {
    this.set('player.currentStep', 0);

    if (this.get('timer')) {
      Ember.run.cancel(this.get('timer'));
      this.set('timer', null);
    }
  },

  actions: {

    /*
     * Intenta habilitar o deshabilitar un track dado un número o posición.
     */
    toggleEnabledTrackByIndex(index) {
      var track = this.get('pattern.tracks')[index-1];

      if (track) {
        var lastValue = Ember.get(track, 'enabled');
        Ember.set(track, 'enabled', !lastValue);
      }
    },

    /*
     * Alterna la reproducción del track.
     *   how: Boolean?
     *     true -> Play
     *     false -> Stop
     *     undefined -> !playing
     */
    togglePlay(how) {
      /* how es su valor o toggleo playing */
      how = how === undefined ? !this.get('playing') : how;

      /* Si no hay nada para hacer entonces no hay nada para hacer */
      if(how === this.get('playing')) {
        return;
      }

      this.set('playing', how);

      if(this.get('playing')) {
        this.set('player.playing', true);
        this.play();
      } else {
        this.set('player.playing', false);
        this.stop();
      }

    },

    /*
     * Actualiza la cantidad de bloques a reproducir.
     * 16, 12, 8, 4, 2?
     */
    updateStepsLimit(steps) {
      this.set('player.stepsLimit', steps);
      var tracks = this.get('pattern.tracks');
      tracks.forEach((t) => {
        // aca habilitamos a los pasos "disponibles"
        t.steps.slice(0, steps).forEach((s) => {
          Ember.set(s, "disabled", false);
        });
        // aca deshabilitamos al resto
        t.steps.slice(steps).forEach((s) => {
          Ember.set(s, "disabled", true);
        });
      });
    }
  }
});
