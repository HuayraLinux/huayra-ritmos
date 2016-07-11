import Ember from 'ember';

export default Ember.Service.extend({
  settings: Ember.inject.service(),
  recorder: Ember.inject.service(),
  sounds: {},
  categories: [],
  p5: null,

  getSoundsByCategory(category) {
    return this.get('sounds')[category];
  },

  getSoundsByCategoryAsList(category) {
    var dictionary = this.getSoundsByCategory(category);

    var values = Object.keys(dictionary).map(function(key){
      return dictionary[key];
    });

    return values;
  },

  getCategories() {
    return this.get('categories');
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

    this.set('sounds', {});
    this.set('categories', []);

    return new Ember.RSVP.Promise((success) => {
      this.set('p5', new p5());

      this.get('categories').pushObject('basicos');
      this.get("sounds")['basicos'] = {};
      this.add_fixed_sound("basicos", "000_drum1.wav");
      this.add_fixed_sound("basicos", "002_drum3.wav");
      this.add_fixed_sound("basicos", "bombo.wav");

      setTimeout(success, 1000);
    });

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
