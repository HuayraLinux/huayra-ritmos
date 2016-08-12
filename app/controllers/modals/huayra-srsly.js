import Ember from 'ember';

function dummy() {
}

function value(key, defaultValue) {
    return Ember.computed(key, function() {
        return this.get(key) || defaultValue;
    });
}

export default Ember.Controller.extend({
    model: null,
    accion: value('model.accion', 'hacer esto'),
    si: value('model.si', '¡Sí!'),
    no: value('model.no', '🤔 No'),
    ok: value('model.ok', dummy),
    cancel: value('model.cancel', dummy),
    close: value('model.close', dummy),

    actions: {
        ok() {
            this.get('ok')();
            this.get('close')();
        },
        cancel() {
            this.get('cancel')();
            this.get('close')();
        }
    }
});