import Ember from 'ember';

export default Ember.Route.extend({

  actions: {
    close() {
       return window.history.back();
    },
  }

});
