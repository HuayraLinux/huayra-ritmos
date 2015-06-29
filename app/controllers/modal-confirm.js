import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    accept: function() {
      alert("Accept!");
      this.send('closeModal');
    }
  }
});
