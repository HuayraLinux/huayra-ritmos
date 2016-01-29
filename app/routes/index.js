import Ember from 'ember';

export default Ember.Route.extend({
  menu: Ember.inject.service(),
  model() {
    return new Ember.RSVP.Promise((resolve) => {
      var patterns = this.store.find('pattern');
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
      this.get('menu').index();
  },
  deactivate(){
    var patternController = this.controllerFor("pattern");

    this.get('menu').pattern();
    this.get('menu').itemGuardar.click = function () { patternController.send('save') };
    this.get('menu').itemGuardar.click = function () { patternController.send('save') };
    this.get('menu').itemCerrar.click = function () { patternController.send('goIndex') };
  },
  actions: {
    invalidateModel() {
      Ember.Logger.log('Route is now refreshing...');
      this.refresh();
    }
  }
});
