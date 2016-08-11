import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['huayra-title-editable-container'],
  modal: Ember.inject.service(),
  value: '',
  onChange: null,
  onCancel: null,
  showModal: null,
  removeModal: null,

  mouseDown() {
    this.sendAction('showModal', 'modals/huayra-prompt', {
      title: 'Ingrese el nuevo título',
      value: this.get('value'),
      accept: (value) => {
        this.set('value', value === '' ? 'Sin título' : value);
        this.sendAction('onChange');
        this.sendAction('removeModal');
      },
      cancel: () => {
        this.sendAction('onCancel');
        this.sendAction('removeModal');
      },
      close: () => {
        this.sendAction('removeModal');
      }
    });
  }
});
