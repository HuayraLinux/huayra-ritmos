import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['huayra-track'],

  indexNumber: function() {
    return this.get('index') + 1;
  }.property('index'),

  trackName: function() {
    return this.get('track.sound').split('.')[0];
  }.property('track.sound'),

  actions: {
    onChange() {
      this.sendAction('onChange');
    }
  }

});
