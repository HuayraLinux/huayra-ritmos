import Ember from 'ember';

export default Ember.Helper.extend({
  compute(params, hash) {
    var appRoute = Ember.getOwner(this).lookup('route:application');
    return appRoute.send.bind(appRoute, 'showModal', params[0], hash);
  }
});