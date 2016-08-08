import Ember from 'ember';

var _colores = ['verde', 'amarillo', 'naranja', 'rojo', 'violeta', 'azul'];

export default Ember.Component.extend({
    classNames: ['color-picker'],
    onColorSelected: null,
    color: null,
    colores: Ember.computed('color', function() {
        var hacerColor = (color) => ({ nombre: color, seleccionado: this.get('color') === color });
        return _colores.map(hacerColor);
    }),

    actions: {
        colorSelected(color) {
            this.sendAction('onColorSelected', color);
        }
    }
});
