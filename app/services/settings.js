import Ember from 'ember';

export default Ember.Service.extend({
  getPrefix() {
    var isNodeWebkit = (typeof process === "object");

    if (isNodeWebkit) {
      var fs = window.requireNode('fs');
      if (fs.existsSync('dist')) {
        return "dist/";
      } else {
        return "";
      }
    }

    return "";
  }
});
