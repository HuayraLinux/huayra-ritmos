import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
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

  actions: {
    invalidateModel: function() {
      Ember.Logger.log('Route is now refreshing...');
      this.refresh();
    }
  }
});
