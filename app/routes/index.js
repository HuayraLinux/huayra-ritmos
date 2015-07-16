import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return new Ember.RSVP.Promise((resolve) => {
      var patterns = this.store.find('pattern');
      var newArray = [];

      patterns.then((data) => {
        data.forEach((record) => {
          if (!record.get('isNew')) {
            newArray.push(record);
          }
        });

        resolve(newArray);
      });
    });
  }
});
