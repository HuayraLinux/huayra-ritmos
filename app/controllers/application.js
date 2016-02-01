import Ember from 'ember';

export default Ember.Controller.extend({
  version: Ember.inject.service(),
  showAbout: false,
  disableBackSpace: Ember.on('init', function() {
    Ember.$(document).on("keydown", function (e) {
      if (e.which === 8 && !Ember.$(e.target).is("input, textarea")) {
          e.preventDefault();
      }
    });
  }),
  actions:{
    showAboutModal(){
      this.set('showAbout', true);
    },
    closeAboutModal(){
      this.set('showAbout', false);
    }
  }
});
