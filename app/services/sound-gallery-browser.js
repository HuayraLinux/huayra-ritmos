import Ember from 'ember';
import {service} from '../service';

export default Ember.Service.extend({
  settings: service('settings'),
  sounds: {},
  categories: [],

  onInit: Ember.on('init', function() {
    this.set('sounds', {});
    this.set('categories', []);

    var loadProcess = new Ember.RSVP.Promise((success) => {

      this.get('categories').pushObject('basicos');
      this.get("sounds")['basicos'] = {};
      this.add_fixed_sound("basicos", "drum 1.wav");
      this.add_fixed_sound("basicos", "drum 2.wav");

      this.get('categories').pushObject('alchemist');
      this.get("sounds")['alchemist'] = {};
      this.add_fixed_sound("alchemist", "kick 1.wav");
      this.add_fixed_sound("alchemist", "kick 2.wav");
      this.add_fixed_sound("alchemist", "kick 3.wav");
      this.add_fixed_sound("alchemist", "kick 4.wav");
      this.add_fixed_sound("alchemist", "kick 5.wav");
      this.add_fixed_sound("alchemist", "kick 6.wav");
      this.add_fixed_sound("alchemist", "kick 7.wav");
      this.add_fixed_sound("alchemist", "kick 8.wav");
      this.add_fixed_sound("alchemist", "kick 9.wav");
      this.add_fixed_sound("alchemist", "kick 10.wav");
      this.add_fixed_sound("alchemist", "hihat 1.wav");
      this.add_fixed_sound("alchemist", "hihat 2.wav");
      this.add_fixed_sound("alchemist", "hihat 3.wav");
      this.add_fixed_sound("alchemist", "hihat 4.wav");
      this.add_fixed_sound("alchemist", "hihat 5.wav");
      this.add_fixed_sound("alchemist", "hihat 6.wav");
      this.add_fixed_sound("alchemist", "hihat 7.wav");
      this.add_fixed_sound("alchemist", "hihat 8.wav");
      this.add_fixed_sound("alchemist", "hihat 9.wav");
      this.add_fixed_sound("alchemist", "hihat 10.wav");
      this.add_fixed_sound("alchemist", "shaker 1.wav");
      this.add_fixed_sound("alchemist", "shaker 2.wav");
      this.add_fixed_sound("alchemist", "shaker 3.wav");
      this.add_fixed_sound("alchemist", "shaker 4.wav");
      this.add_fixed_sound("alchemist", "shaker 5.wav");
      this.add_fixed_sound("alchemist", "snare 1.wav");
      this.add_fixed_sound("alchemist", "snare 2.wav");
      this.add_fixed_sound("alchemist", "snare 4.wav");
      this.add_fixed_sound("alchemist", "snare 5.wav");
      this.add_fixed_sound("alchemist", "snare 6.wav");
      this.add_fixed_sound("alchemist", "snare 7.wav");
      this.add_fixed_sound("alchemist", "snare 8.wav");
      this.add_fixed_sound("alchemist", "snare 9.wav");
      this.add_fixed_sound("alchemist", "snare 10.wav");
      
      this.get('categories').pushObject('bits');
      this.get("sounds")['bits'] = {};
      this.add_fixed_sound("bits", "clap.wav");
      this.add_fixed_sound("bits", "cowbell.wav");
      this.add_fixed_sound("bits", "hihat 1.wav");
      this.add_fixed_sound("bits", "hihat 2.wav");
      this.add_fixed_sound("bits", "kick 1.wav");
      this.add_fixed_sound("bits", "kick 2.wav");
      this.add_fixed_sound("bits", "kick 3.wav");
      this.add_fixed_sound("bits", "kick 4.wav");
      this.add_fixed_sound("bits", "kick 5.wav");
      this.add_fixed_sound("bits", "kick 6.wav");
      this.add_fixed_sound("bits", "kick 7.wav");
      this.add_fixed_sound("bits", "kick 8.wav");
      this.add_fixed_sound("bits", "snare 1.wav");
      this.add_fixed_sound("bits", "snare 2.wav");
      this.add_fixed_sound("bits", "snare 3.wav");
      this.add_fixed_sound("bits", "snare 4.wav");
      this.add_fixed_sound("bits", "snare 5.wav");
      this.add_fixed_sound("bits", "snare 6.wav");
      this.add_fixed_sound("bits", "snare 7.wav");
      this.add_fixed_sound("bits", "snare 8.wav");
      this.add_fixed_sound("bits", "tom 1.wav");
      this.add_fixed_sound("bits", "tom 2.wav");

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
