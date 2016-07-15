import Ember from 'ember';

export default Ember.Component.extend({
    auto: false,
    onChange: null,

    didInsertElement() {
        let input = this.$('#importar');

        input.change(() => {
            this.sendAction('onChange', input.val());
        });

        if(this.get('auto')) {
            input.trigger('click');
        }
    }
});
