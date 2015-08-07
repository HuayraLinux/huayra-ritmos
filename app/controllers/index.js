import Ember from 'ember';

export default Ember.Controller.extend({
  version: Ember.inject.service(),


  actions: {
    new() {
      this.transitionToRoute('new');
    },

    deleteRecord(model) {
      model.destroyRecord();
      this.send('invalidateModel');
    }
  }
});
