import Ember from 'ember';

export default Ember.Route.extend({
  model(param) {
    return {message: param.message};
  }
});
