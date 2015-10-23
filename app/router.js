import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

export default Router.map(function() {
  
  this.resource('pattern', {path: '/pattern/:pattern_id'}, function() {
    this.route('newTrack');
  });
});
