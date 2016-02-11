import Ember from 'ember';

export default Ember.Controller.extend({
  version: Ember.inject.service(),
  settings: Ember.inject.service(),
  showAbout: false,
  showConfig: false,
  userPrefix: null,
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
      var settings = this.get('settings');
      this.set('userPrefix', settings.getUserPrefix);
      this.set('showConfig', true);
    },
    closeConfigModal(){
      this.set('showConfig', false);
    },
    selectUserPrefix(){
      var settings = this.get('settings');
      var self = this;
      $('#inputUserPrefix').trigger('click').on('change', function(e){
        self.set('userPrefix', $(this).val());
        settings.setUserPrefix($(this).val());
      });
    }
  }
});
