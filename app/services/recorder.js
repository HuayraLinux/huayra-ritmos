import Ember from 'ember';

export default Ember.Service.extend(Ember.Evented, {
  recording: false,
  recorder: null,
  input: null,
  file: null,

  onInit: Ember.on('init', function() {
    this.set('recorder', new p5.SoundRecorder());
    this.set('file', new p5.SoundFile());
    this.set('input', this.get('recorder').input);
    
    /* DEBUG */
    window.recording = {
      recorder: this.get('recorder'),
      file: this.get('file')
    };
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
    this.set('recording', true);
    this.one('pattern-end', () => {
      let file = this.get('file');
      let recorder = this.get('recorder');

      // 60segundos, 4subtiempos por tiempo
      recorder.record(file, (60 / bpm / 4) * steps, () => {
        this.set('recording', false);
      });
    });
  },

  cancelRecording() {
    this.get('recorder').stop();
  }
});
