import Ember from 'ember';

export default Ember.Controller.extend({
  modelFactory: Ember.inject.service(),
  version: Ember.inject.service(),
  modal: Ember.inject.service(),

  actions: {
    new() {
      this.get('modal').titlePrompt('¿Cómo se llama tu nuevo ritmo?').then((titulo) => {
        var initial_record = this.get('modelFactory').get_initial_record();
        var record = this.get('store').createRecord('pattern', {
          title: titulo,
          content: JSON.stringify(initial_record),
        });

        this.transitionToRoute('pattern', record);
      });
    },

    deleteRecord(model) {
      model.destroyRecord();
      this.send('invalidateModel');
    }
  }
});
