import Ember from 'ember';

export default Ember.Component.extend({
  active_id: -1,
  sounds: [
    {
      id: 1,
      title: "title 1"
    },
    {
      id: 2,
      title: "title 123123"
    },
    {
      id: 3,
      title: "title : 123"
    },
  ],

  actions: {
    select(sound) {
      this.set('active_id', sound.id);
    }
  }

});
