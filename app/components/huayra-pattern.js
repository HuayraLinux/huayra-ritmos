import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    onChange() {
      this.sendAction('onChange');
    }
  }
});
