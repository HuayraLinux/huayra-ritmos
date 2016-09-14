import Ember from 'ember';

var defaultNote = () => '';
var defaultValidator = () => true;

export default Ember.Controller.extend({
    validationObserver: Ember.observer('model.value', function() {
        var noteValidator = this.get('model.notes') || defaultNote;
        var validator = this.get('model.validator') || defaultValidator;
        var title = this.get('model.value');

        noteValidator(title).then((note) => this.set('note', note));
        validator(title).then((valid) => this.set('isInvalid', !valid));
    }),
    note: '',
    isInvalid: true,

    actions: {
      userPressEnter() {
        $("#prompt-aceptar").click();
      }
    }
});
