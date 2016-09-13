import Ember from 'ember';

export default Ember.Component.extend({
  modal: Ember.inject.service(),
  classNames: ['huayra-title-editable-container'],
  value: '',
  onChange: null,
  onCancel: null,
  showModal: null,
  removeModal: null,

  accept(value) {
    this.set('value', value === '' ? 'Sin título' : value);
    this.sendAction('onChange');
  },
  cancel() {
    this.sendAction('onCancel');
  },

  actions: {
    editarTitulo() {
      this.get('modal').titlePrompt("Ingresá el nuevo título", this.get('value'))
        .then((title) => this.accept(title), () => this.cancel());
    }
  }
});
