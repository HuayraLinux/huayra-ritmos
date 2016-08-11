import Ember from 'ember';
import {service} from '../service';

export default Ember.Component.extend({
  active_id: null,
  classNames: ['ember-sound-selector'],
  audio: Ember.inject.service(),
  settings: service('settings'),
  soundGallery: service('sound-gallery'),
  currentCategory: 'basicos',

  soundsInThisCategory: Ember.computed('currentCategory', 'soundGallery', function() {
    return this.get('soundGallery').getSoundsByCategoryAsList(this.get('currentCategory'));
  }),

  categories: Ember.computed('soundGallery', function() {
    return this.get('soundGallery').getCategories();
  }),

  actions: {
    select(sound) {
      this.set('active_id', sound.id);
      this.sendAction('onSelect', sound);
      this.get('audio').previewSound(sound);
    },

    selectCategory(category) {
      this.set('currentCategory', category);
    }
  }

});
