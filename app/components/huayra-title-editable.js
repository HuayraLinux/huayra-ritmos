import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['huayra-title-editable-container'],

  mouseDown: function() {
    var new_value = prompt("Ingresa el nuevo título", this.get('value'));

    if (new_value) {
      this.set('value', new_value);
    } else {
      this.set('value', 'sin título');
    }

  }
});
