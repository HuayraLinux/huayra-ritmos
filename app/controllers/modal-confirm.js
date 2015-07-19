import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    cancel: function() {
      alert("cancel!");
    },

    accept: function() {
      alert("Accept!");
      this.send('closeModal');
    }
  }
});
