import Ember from 'ember';

export default Ember.Component.extend({
  pattern: null,

  actions: {
    verModelo() {
      debugger;
      console.log(this.get('pattern'));
    }
  }
});
