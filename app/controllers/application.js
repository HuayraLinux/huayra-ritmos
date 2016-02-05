import Ember from 'ember';

export default Ember.Controller.extend({
  version: Ember.inject.service(),
  settings: Ember.inject.service(),
  showAbout: false,
  showConfig: false,
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
    },
    showConfigModal(){
      this.set('showConfig', true);
    },
    closeConfigModal(){
      this.set('showConfig', false);
    },
    updateUserPrefix(newPath){
      console.log(newPath);
    },
    selectUserPrefix(){
      var settings = this.get('settings');
      $('#inputUserPrefix').trigger('click').on('change', function(e){
        settings.setUserPrefix($(this).val());
      });
    }
  }
});
