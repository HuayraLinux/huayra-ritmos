import Ember from 'ember';

export default Ember.Controller.extend({
  version: Ember.inject.service(),


  actions: {
    new: function() {
      this.transitionToRoute('new');
    },

    deleteRecord: function(model) {
      model.destroyRecord();
      this.send('invalidateModel');
    }
  }
});
