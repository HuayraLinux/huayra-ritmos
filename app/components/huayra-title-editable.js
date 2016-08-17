import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['huayra-title-editable-container'],
  modal: Ember.inject.service(),
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
    }
  }
});
