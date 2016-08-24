import Ember from 'ember';
import naturalSort from '../naturalSort';
import {service} from '../service';

const fs = require('fs');
const path = require('path');
const VALID_EXTENSIONS = /\.(?:wav|ogg|mp3)$/;

export default Ember.Service.extend({
  settings: service('settings'),
  sounds: {},
  categories: [],
  folders: {}, // Hash con la forma <category>: <folder>


  onInit: Ember.on('init', function() {
    var loadProcess = new Ember.RSVP.Promise((success) => {
      this.loadCategories();

      this.get('categories').forEach((category) => {
        this.get('sounds')[category] = this.loadCategory(category);
      });

      success();
    });

    this.set('loadSounds', () => loadProcess);
  }),

  getSoundsByCategoryAsList(category) {
    var dictionary = this.get('sounds')[category]; // SoundsByCategory

    var values = Object.keys(dictionary).map(function(key){
      return dictionary[key];
    });

    return values;
  },

  getAudioClip(audioThing){
    if(typeof(audioThing) === "string"){
      var [category, filename] = audioThing.split('/');
      return this.get('sounds')[category][filename].audioClip;
    } else {
      return audioThing.audioClip;
    }
  },

  loadCategory(category) {
    var sounds = {};
    var folder = Ember.get(this.get('folders'), category);

    var files = fs.readdirSync(folder).filter((filename) => {
      return VALID_EXTENSIONS.test(filename);
    });

    files.sort(naturalSort);

    files.forEach((filename) => {
      let filepath = path.join(folder, filename);

      let title = filename.replace(VALID_EXTENSIONS, '');
      let audioClip = loadSound(filepath, (sound) => {
        /*
         * Cuándo termina de cargar todo reviso si es suficientemente
         * largo como para no estar en sustain
         */
        if(sound.duration() > 1.5) {
          sound.playMode('restart');
        }
      });

      sounds[filename] = {
        id: name,
        title: title,
        category: category,
        audioClip: audioClip,
      };
    });

    return sounds;
  },

  loadCategories() {
    var isFolder = (folder) => fs.statSync(folder).isDirectory();

    var systemSounds = this.get('settings.systemSounds');
    var userSounds = this.get('settings.userSounds');
    [].concat(systemSounds)
      .concat(userSounds)
      .filter(fs.existsSync)
      .filter(isFolder)
      .forEach((folder) => {
        fs.readdirSync(folder)
          .filter((category) => isFolder(path.join(folder, category)))
          .forEach((category) => {
            this.get('categories').pushObject(category);
            Ember.set(this.get('folders'), category, path.join(folder, category));
          });
      });
  },

  loadSounds() {
    // Lo genera onInit por como quedó el router
  },

});
