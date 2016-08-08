import Ember from 'ember';

var _steps = [2, 4, 8, 12, 16];

export default Ember.Component.extend({
    tagName: 'span',
    classNames: ['uk-button-group'],
    onStepslimitSelected: null,
    stepslimit: null,
    steps: Ember.computed('stepslimit', function() {
        var hacerStepslimit = (stepslimit) => ({ steps: stepslimit, seleccionado: this.get('stepslimit') === stepslimit });
        return _steps.map(hacerStepslimit);
    }),

    actions: {
        stepslimitChange(stepslimit) {
            this.sendAction('onStepslimitSelected', stepslimit);
        }
    }
});
