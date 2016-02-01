import Ember from 'ember';

export default Ember.Route.extend({
  menu: Ember.inject.service(),
  model() {
    return new Ember.RSVP.Promise((resolve) => {
      var patterns = this.store.find('pattern');
      var newArray = Ember.A();

      patterns.then((data) => {
        data.forEach((record) => {
          if (!record.get('isNew')) {
            newArray.pushObject(record);
          }
        });

        resolve(newArray.reverse());
      });
    });
  },
  activate() {
      this.get('menu').index();
      document.title = 'Huayra Ritmos';
  },
  actions: {
    invalidateModel() {
      Ember.Logger.log('Route is now refreshing...');
      this.refresh();
    }
  }
});
