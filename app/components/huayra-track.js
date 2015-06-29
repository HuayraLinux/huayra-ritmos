import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['huayra-track'],

  indexNumber: function() {
    return this.get('index') + 1;
  }.property('index'),

  
});
