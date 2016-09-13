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

  prompt(title, validator, notes, defaultValue) {
    let route = Ember.getOwner(this).lookup('route:application');
    return new Ember.RSVP.Promise((resolve, reject) => {
      route.send('showModal', 'modals/huayra-prompt', {
        title: title,
        cancel: reject,
        close: reject,
        accept: resolve,
        notes: notes,
        validator: validator,
        value: defaultValue
      });
    }).finally(() => route.send('removeModal'));
  },

  titlePrompt(promptTitle, defaultValue) {
    const OK = '';
    const EMPTY_TITLE = 'El título no puede estar vacío';
    const USED_TITLE = 'Ya hay un proyecto con ese nombre';
    defaultValue = defaultValue || '';

    const validar = (titulo) => {
      if(titulo === '' || titulo === undefined) {
        return new Ember.RSVP.Promise((ret) => ret(EMPTY_TITLE));
      } else {
        return this.validarTitulo(titulo).then((isValid) => isValid ? OK : USED_TITLE);
      }
    };

    return this.prompt(
      promptTitle,
      (titulo) => validar(titulo).then((code) => code === OK ? true : false),
      (titulo) => validar(titulo),
      defaultValue
    );
  }
});