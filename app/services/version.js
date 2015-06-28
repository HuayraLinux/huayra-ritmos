import Ember from 'ember';

export default Ember.Service.extend({
  version: null,

  getVersion: function() {
    var config = require('./package.json');
    this.set('version', config.version);
  }.on('init'),

});
