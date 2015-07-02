import Ember from 'ember';

export default Ember.Controller.extend({

  pattern: {},     // se cargan desde el setupcontroller de route:pattern
  player: {},      // se cargan desde el setupcontroller de route:pattern

  actions: {
    save: function() {

      var record = JSON.stringify({player: this.get('player'), pattern: this.get('pattern')});
      var model = this.get('model').set('content', record);

      model.save().then((data) => {
          this.transitionToRoute('index');
      });

    }
  }

});
