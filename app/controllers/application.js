import Ember from 'ember';
import {service} from '../service';

export default Ember.Controller.extend({
  menu: service('menu'),
  version: Ember.inject.service(),
  settings: service('settings'),
  showAbout: false,
  showConfig: false,
  userSounds: Ember.computed.alias('settings.userSounds'),

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
      this.set('showConfig', true);
    },

    closeConfigModal() {
      this.set('showConfig', false);
    },

    abrirSitioDeHuayra() {
      require("electron").shell.openExternal("http://huayra.conectarigualdad.gob.ar/");
    },

    selectUserPrefix() {
      $('#inputUserPrefix').trigger('click').on('change', (event) => {
        this.set('userSounds', event.target.files[0].path);
      });
    }
  }
});
