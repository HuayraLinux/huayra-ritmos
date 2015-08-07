import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['huayra-title-editable-container'],

  mouseDown() {
    var new_value = prompt("Ingresa el nuevo título", this.get('value'));

    if (new_value) {

      if (new_value === "") {
        this.set('value', 'sin título');
      } else {
        this.set('value', new_value);
      }

      this.sendAction('onChange');
    }

  }
});
