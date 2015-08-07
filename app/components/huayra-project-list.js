import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['huayra-project-list-container'],

  actions: {
    delete(model) {
      this.sendAction('onDelete', model);
    }
  }
});
