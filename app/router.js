import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  
  this.route('pattern', {path: '/pattern/:pattern_id'}, function() {
    this.route('newTrack');
  });

  this.route('loading');
  this.route('importar');
});

export default Router;
