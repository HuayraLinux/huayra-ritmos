import Ember from 'ember';

export default Ember.Component.extend({
  modal: Ember.inject.service(),
  classNames: ['huayra-title-editable-container'],
  value: '',
  onChange: null,
  onCancel: null,
  showModal: null,
  removeModal: null,

  actions: {
    accept(value, closeModal) {
      this.set('value', value === '' ? 'Sin título' : value);
      this.sendAction('onChange');
      closeModal();
    },
    cancel(closeModal) {
      this.sendAction('onCancel');
      closeModal();
    },
    validate(title) {
      return this.get('modal').validarTitulo(title);
    },
    notas(title) {
      return this.get('modal').validarTitulo(title).then((valido) => valido ? '' : 'Ya hay un proyecto con ese nombre');
    }
  }
});
