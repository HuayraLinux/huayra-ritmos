import Ember from 'ember';
import {service} from '../service';

export default Ember.Route.extend({
  menu: service('menu'),
  settings: service('settings'),

  onInit: Ember.on('init', function() {
    let sendToController = (action) => this.controllerFor('application').send(action);
    this.get('menu').on('acerca_de',  () => sendToController('showAboutModal'));
    this.get('menu').on('configurar', () => sendToController('showConfigModal'));
  }),

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
    this.get('settings');

    document.title = 'Huayra Ritmos';

    this.get('menu').index();
  },

  actions: {
    invalidateModel() {
      Ember.Logger.log('Route is now refreshing...');
      this.refresh();
    }
  }

});
