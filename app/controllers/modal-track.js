import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    remove() {
      let tracks = this.get('modal.model.pattern.tracks');
      let track = this.get('modal.model.track');

      // Busca la posición del track para eliminar

      tracks.removeObject(track);

      this.controllerFor('pattern').send('onChange');
      this.send('closeModal');
    },
    setcolor(color) {
      let track = this.get('modal.model.track');
      Ember.set(track, "color", color);
      this.send('closeModal');
    }
  }
});
