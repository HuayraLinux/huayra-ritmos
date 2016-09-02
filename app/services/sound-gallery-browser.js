import Ember from 'ember';
import {service} from '../service';

export default Ember.Service.extend({
  settings: service('settings'),
  recorder: Ember.inject.service(),
  sounds: {},
  categories: [],

  onInit: Ember.on('init', function() {
    this.set('sounds', {});
    this.set('categories', []);

    var loadProcess = new Ember.RSVP.Promise((success) => {

      this.get('categories').pushObject('basicos');
      this.get("sounds")['basicos'] = {};
      this.add_fixed_sound("basicos", "000_drum1.wav");
      this.add_fixed_sound("basicos", "002_drum3.wav");
      this.add_fixed_sound("basicos", "bombo.wav");

      success();
    });

    this.set('loadSounds', () => loadProcess);
  }),

  getSoundsByCategoryAsList(category) {
    var dictionary = this.get('sounds')[category];

    var values = Object.keys(dictionary).map(function(key){
      return dictionary[key];
    });

    return values;
  },

  getAudioClip(audioThing){
   var audioClip;

   if(typeof(audioThing) === "string"){
    var category = audioThing.split('/')[0];
    var filename = audioThing.split('/')[1];
    audioClip = this.get('sounds')[category][filename].audioClip;
   }
    else{
     audioClip = audioThing.audioClip;
   }
   return audioClip;
  },


  loadSounds() {
    // Lo genera onInit por como quedó el router
  },


  add_fixed_sound(category, filename) {
    let name = filename.replace(".wav", '');
    let audioClip = loadSound(`sounds/${category}/${filename}`);

    this.get("sounds")[category][filename] = {
        id: name,
        title: name,
        category: category,
        audioClip: audioClip
    };
  }

});
