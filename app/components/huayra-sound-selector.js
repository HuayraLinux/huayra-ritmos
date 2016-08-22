import Ember from 'ember';
import {service} from '../service';

export default Ember.Component.extend({
  sound: 'sounds/basicos/000_drum1.wav',
  currentCategory: 'basicos',
  classNames: ['ember-sound-selector'],
  audio: Ember.inject.service(),
  settings: service('settings'),
  soundGallery: service('sound-gallery'),

  onInit: Ember.on('init', function() {
    /* Sound es un path, el último directorio es la categoría */
    var category = this.get('sound').split('/').slice(-2)[0];
    this.set('currentCategory', category);
  }),

  didInsertElement() {
    this.$().animate({
      scrollTop: this.$('td.active').position().top - 20
    }, 500);
  },

  soundsInThisCategory: Ember.computed('currentCategory', 'soundGallery', function() {
    return this.get('soundGallery').getSoundsByCategoryAsList(this.get('currentCategory'));
  }),

  sounds: Ember.computed('soundsInThisCategory', 'sound', function() {
    var currentSound = this.get('sound');
    var catAndFile = (sound) => sound.split('/').slice(-2).join('/');

    return this.get('soundsInThisCategory')
      .map((sound) => Ember.merge({selected: catAndFile(sound.audioClip.file) === catAndFile(currentSound)}, sound));
  }),

  categoryNames: Ember.computed('soundGallery', function() {
    return this.get('soundGallery').getCategories();
  }),

  categories: Ember.computed('categoryNames.@each', 'currentCategory', function() {
    var currentCategory = this.get('currentCategory');
    return this.get('categoryNames')
      .map((name) => ({name: name, selected: name === currentCategory}));
  }),

  actions: {
    select(sound) {
      this.set('sound', sound.audioClip.file);
      this.sendAction('onSelect', sound);
      this.get('audio').previewSound(sound);
    },

    selectCategory(category) {
      this.set('currentCategory', category);
    }
  }

});
