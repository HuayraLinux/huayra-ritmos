import Ember from 'ember';

// Hay alguna forma de importar según la nueva onda las libs viejas?
const zlib = requireNode('zlib');
const tar  = requireNode('tar-stream');

/* Source: http://stackoverflow.com/questions/8609289/convert-a-binary-nodejs-buffer-to-javascript-arraybuffer */
function toArrayBuffer(buffer) {
    var ab = new ArrayBuffer(buffer.length);
    var view = new Uint8Array(ab);
    for (var i = 0; i < buffer.length; ++i) {
        view[i] = buffer[i];
    }
    return ab;
}

export default Ember.Service.extend({
    FILE_VERSION: '0.1',
    guardar(titulo, pattern) {
        /*
         * Pasos a añadir:
         * Detectar los sonidos que están fuera de la lib
         * preinstalada y copiarlos al tar, actualizar las
         * referencias en el proyecto y armar la lógica de
         * carga.
         */
        /* Creo el tar y le agrego las entries correspondientes */
        let proyecto = tar.pack();
        proyecto.entry(
            { name: 'ritmo.json' },
            JSON.stringify({
                version: this.get('FILE_VERSION'),
                titulo: titulo,
                pattern: pattern
            }
        ));

        /* Creo el compresor y me dispongo a recojer su output */
        let gz = zlib.createGzip();
        let promise = new Ember.RSVP.Promise((resolve) => {
            let data = [];
            /* Si hay data la agrego */
            gz.on('data', (zdata) => {
                data.push(toArrayBuffer(zdata));
            });
            /* Al final de todo cumplo mi promesa porque soy nene bueno */
            gz.on('end', () => {
                resolve(data);
            });
        });

        proyecto.pipe(gz);
        proyecto.finalize();

        /* Devuelvo la promesa de que el que depositó patterns recibirá patterns */
        return promise;
    }
});
