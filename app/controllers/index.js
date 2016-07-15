import Ember from 'ember';

export default Ember.Controller.extend({
  modelFactory: Ember.inject.service(),
  version: Ember.inject.service(),

  actions: {
    new() {
      var initial_record = this.get('modelFactory').get_initial_record();
      var record = this.get('store').createRecord('pattern', {
        title: "Sin título",
        content: JSON.stringify(initial_record),
      });

      this.transitionToRoute('pattern', record);
    },

    deleteRecord(model) {
      model.destroyRecord();
      this.send('invalidateModel');
    },
  }
});
