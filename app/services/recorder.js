import Ember from 'ember';

export default Ember.Service.extend(Ember.Evented, {
  recording: false,
  recorder: null,
  canceled: false,
  input: null,
  file: null,

  onInit: Ember.on('init', function() {
    this.set('recorder', new p5.SoundRecorder());
    this.set('file', new p5.SoundFile());
    this.set('input', this.get('recorder').input);
  }),

  /*
   * Inicia la grabación o la pausa y da el wav a guardar
   *   Experimental: Puede prender fuego cosas (y matar gatitos)
   * Qué debería pasar:
   *   Al empezar a grabar espero que termine la primera vuelta y grabo la
   *   segunda con cualquier sonido remanente de la primera.
   *   Para eso me quedo escuchando el evento 'pattern-end', a partir del cual
   *   grabo y espero al segundo para frenar.
   */
  record(recordTitle, bpm, steps) {
    /* Si estoy grabando fallo de una */
    if(this.get('recording')) {
      return new Ember.RSVP.Promise((_, reject) => {
        reject();
      });
    }
    /* Sino preparo todo y devuelvo la promesa */
    this.set('recording', true);
    this.set('canceled', false);
    return new Ember.RSVP.Promise((resolve, reject) => {
      /* Grabo la segunda vuelta nomás  */
      this.one('pattern-start', () => {
        this.one('pattern-start', () => {
          let file = this.get('file');
          let recorder = this.get('recorder');

          if(this.get('canceled')) {
            this.set('recording', false);
            return reject();
          }

          /* 60 segundos, 4 subtiempos por tiempo */
          recorder.record(file, (60 / bpm / 4) * steps, () => {
            this.set('recording', false);

            if(this.get('canceled')) {
              reject();
            } else {
              resolve(file);
            }
          });
        });
      });
    });
  },

  cancelRecording() {
    this.set('canceled', true);
    this.get('recorder').stop();
  }
});
