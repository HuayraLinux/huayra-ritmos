import Ember from 'ember';

export default Ember.Service.extend({
  store: Ember.inject.service(),

  validarTitulo(title) {
    return this.get('store').query('pattern', {title: title}).then((proyectos) => {
      if(proyectos !== null) {
        /* Si ya hay uno igual no es válido */
        return proyectos.get('length') <= 0;
      }
      return true;
    }, () => true);
  },

  prompt(title, validator, notes) {
    let route = Ember.getOwner(this).lookup('route:application');
    return new Ember.RSVP.Promise((resolve, reject) => {
      route.send('showModal', 'modals/huayra-prompt', {
        title: title,
        cancel: reject,
        close: reject,
        accept: resolve,
        notes: notes,
        validator: validator
      });
    }).finally(() => route.send('removeModal'));
  }
});