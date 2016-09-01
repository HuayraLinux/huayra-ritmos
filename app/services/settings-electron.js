import Ember from 'ember';

const fs = require('fs');
const path = require('path');
const configPath = '.config/huayra-ritmos/huayra-ritmos.ini';

export default Ember.Service.extend({
  config: null,
  userSounds: Ember.computed.alias('config.userSounds'),
  systemSounds: ['sounds', '/usr/share/huayra-ritmos-extra'],

  saveConfig: Ember.observer('userSounds', function() {
    this.get('config').save();
  }),

  init() {
    var homeConfig = require('home-config');
    // Si no existen los directorios, los creamos
    configPath
      .replace(/\/[^\/]*$/, '') /* Quito el archivo al final */
      .split('/') /* Separo los nombres de cada directorio */
      .reduce((basedir, child) => {
        /* Tomo el basedir y le agrego el directorio hijo */
        let dir = path.join(basedir, child);
        let absPath = path.resolve(homeConfig.homeDir, dir);
        /* Si no existe lo creo */
        if (!fs.existsSync(absPath)) {
          fs.mkdirSync(dir);
        }
        return dir;
      }, '');

    let config = homeConfig.load(configPath, {
      userSounds: '~/Música/Huayra Ritmos/Sonidos'
    });
    config.save();

    this.set('config', config);
  },
});
