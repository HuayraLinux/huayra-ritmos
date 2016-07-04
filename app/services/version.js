import Ember from 'ember';

export default Ember.Service.extend({
  version: null,

  getVersion: Ember.on('init', function() {
    var isNodeWebkit = (typeof process === "object");

    if (isNodeWebkit) {
      var config = window.requireNode('../dist/package.json');
      this.set('version', config.version);
    } else {
      this.set('version', 'web');
    }

  }),

});
