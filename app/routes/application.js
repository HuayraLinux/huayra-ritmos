import Ember from 'ember';

export default Ember.Route.extend({
    actions: {
        showModal(name, model) {
            var removeModal = this.send.bind(this, 'removeModal');
            model = model || {};
            Ember.set(model, 'close', model.close || removeModal);
            Ember.set(model, '_close', removeModal);

            this.render(name, {
                into: 'application',
                outlet: 'modal',
                model: model
            });
        },
        removeModal() {
            this.disconnectOutlet({
                outlet: 'modal',
                parentView: 'application'
            });
        }
    }
});
