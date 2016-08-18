import Ember from 'ember';
import {service} from '../service';

export default Ember.Controller.extend({
  menu: service('menu'),
  version: Ember.inject.service(),
  settings: service('settings'),
  showAbout: false,
  showConfig: false,
  userPrefix: null,

  import: Ember.on('init', function() {
    this.get('menu').on('importar', () => {
      this.transitionToRoute('importar');
    });
  }),

  writePID: Ember.on('init', function() {
    /*
    if (isNodeWebkit) {
      let fs = requireNode('fs');
      fs.writeFileSync('/tmp/huayra-ritmos.pid', process.pid);
    }
    */
  }),

  disableBackSpace: Ember.on('init', function() {
    Ember.$(document).on('keydown', function (e) {
      if (e.which === 8 && !Ember.$(e.target).is('input, textarea')) {
          e.preventDefault();
      }
    });
  }),

  actions: {

    showAboutModal() {
      this.set('showAbout', true);
    },

    closeAboutModal() {
      this.set('showAbout', false);
    },

    showConfigModal() {
      var settings = this.get('settings');
      this.set('userPrefix', settings.getUserPrefix);
      this.set('showConfig', true);
    },

    closeConfigModal() {
      this.set('showConfig', false);
    },

    abrirSitioDeHuayra() {
      require("electron").shell.openExternal("http://huayra.conectarigualdad.gob.ar/");
    },

    selectUserPrefix() {
      var settings = this.get('settings');
      var self = this;
      $('#inputUserPrefix').trigger('click').on('change', function(/*e*/){
        self.set('userPrefix', $(this).val());
        settings.setUserPrefix($(this).val());
      });
    }
  }
});
