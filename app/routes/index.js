import Ember from 'ember';
import service from '../service';

let isNodeWebkit = false;

export default Ember.Route.extend({
  menu: service('menu'),
  settings: service('settings'),

  model() {
    return new Ember.RSVP.Promise((resolve) => {
      var patterns = this.store.findAll('pattern');
      var newArray = Ember.A();

      patterns.then((data) => {
        data.forEach((record) => {
          if (!record.get('isNew')) {
            newArray.pushObject(record);
          }
        });

        resolve(newArray.reverse());
      });
    });
  },

  activate() {
    var appController = this.controllerFor("application");
    this.get('settings');

    document.title = 'Huayra Ritmos';

    this.get('menu').index();
    this.get('menu').on('acerca_de', () => appController.send('showAboutModal'));
    this.get('menu').on('configurar', () => appController.send('showConfigModal'));

  },

  actions: {
    invalidateModel() {
      Ember.Logger.log('Route is now refreshing...');
      this.refresh();
    }
  }

});
