import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['huayra-project-list-container'],

  actions: {
    delete: function(model) {
      this.sendAction('onDelete', model);
    }
  }
});
