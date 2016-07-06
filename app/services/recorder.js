import Ember from 'ember';

export default Ember.Service.extend(Ember.Evented, {
  recording: false,
  dummyGain: null,
  onInit: Ember.on('init', function() {
    this.set('dummyGain', getAudioContext().createGain());
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
  record(recordTitle) {
    this.set('recording', true);
    this.one('pattern-end', () => {
      let recorder = new p5.SoundRecorder();
      let file = new p5.SoundFile();

      console.log(this.get('dummyGain'));
      recorder.setInput(this.get('dummyGain'));
      // Duración 0 es lo mismo que infinito (¿Debería ser algún limite por ram de las net?)
      recorder.record(file, 0, () => {
        // Debería ser responsabilidad de la UI esto >:C
        saveSound(file, recordTitle);
      });

      // El proximo evento es el fin de la grabación
      this.one('pattern-end', () => {
        this.set('recording', false);
        recorder.stop();
      });
    });
  },

  cancelRecording() {

  }
});
