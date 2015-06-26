import Ember from 'ember';

export default Ember.Route.extend({
  boombox: Ember.inject.service(),

  activate: function() {
    this.get('boombox');
  }
});
