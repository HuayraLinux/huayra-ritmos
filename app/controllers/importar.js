import Ember from 'ember';
import service from '../service';

export default Ember.Controller.extend({
    exportar: service('exportar'),
    statusCode: 0, /* El paso actual en el proceso de importación */
    status: Ember.computed('statusCode', function() {
        /* Esta es la tabla de textos por cada código */
        return ([
            'Seleccioná un archivo',
            'Esperá un momento, cargando archivo',
            'Importando a la lista de proyectos :)'
        ])[this.get('statusCode')];
    }),

    actions: {
        primerPaso(path) {
            this.incrementProperty('statusCode');

            this.get('exportar').importar(path).then((pattern) => {
                this.send('segundoPaso', pattern);
            });
        },

        segundoPaso(pattern) {
            this.incrementProperty('statusCode');

            let record = this.get('store').createRecord('pattern', pattern.model);

            this.transitionToRoute('pattern', record);
        }
    }
});
