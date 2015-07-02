import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

export default Router.map(function() {
  this.route('tips');
  this.resource('pattern', {path: '/pattern/:pattern_id'});
  this.route('playground');
});
