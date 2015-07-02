import Ember from 'ember';

export default Ember.Service.extend({
  version: null,

  getVersion: function() {
    if (var isNodeWebkit = (typeof process == "object")) {
      var config = require('./package.json');
      this.set('version', config.version);
    }
  }.on('init'),

});
