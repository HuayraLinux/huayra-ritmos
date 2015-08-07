import Ember from 'ember';

export default Ember.Component.extend({
  value: null,
  classNames: ['huayra-sound-switch'],

  mouseDown() {
    this.toggleProperty('value');
  }
});
