import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['huayra-title-editable-container'],
  store: Ember.inject.service(),
  value: '',
  onChange: null,
  onCancel: null,
  showModal: null,
  removeModal: null,

  validarTitulo(title) {
    return this.get('store').query('pattern', {title: title}).then((proyectos) => {
      if(proyectos !== null) {
        /* Si ya hay uno igual no es válido */
        return proyectos.get('length') <= 0;
      }
      return true;
    }, () => true);
  },

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
      return this.validarTitulo(title);
    },
    notas(title) {
      return this.validarTitulo(title).then((valido) => valido? '': 'Ya hay un proyecto con ese nombre');
    }
  }
});
