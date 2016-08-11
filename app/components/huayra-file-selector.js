import Ember from 'ember';
import {inElectron} from '../service';

export default Ember.Component.extend({
    auto: false,
    onChange: null,
    onCancel: null,

    didInsertElement() {
        if(!inElectron) {
            return;
        }
        /* TODO: Compatibilizar para browser */
        var dialog = require('electron').remote.dialog;
        dialog.showOpenDialog({
            title: 'Seleccione el proyecto de ritmos',
            buttonLabel: 'Importar',
            filters: [
                {
                    name: 'Proyecto de ritmos',
                    extensions: ['ritmo'],
                }
            ]
        }, (filenames) => {
            if(filenames && filenames.length > 0) {
                this.sendAction('onChange', filenames[0]);
            } else {
                this.sendAction('onCancel');
            }
        });
    }
});
