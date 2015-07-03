import Ember from 'ember';

export default Ember.Service.extend({
  version: null,

  getVersion: function() {
    var isNodeWebkit = (typeof process === "object");

    if (isNodeWebkit) {
      var config = require('./package.json');
      this.set('version', config.version);
    }
  }.on('init'),

});
