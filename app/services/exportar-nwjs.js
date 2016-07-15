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

function streamToString(stream, cb) {
    let data = '';
    stream.on('data', (buffer) => data +=  buffer.toString());
    stream.on('end', () => cb(data));
}

export default Ember.Service.extend({
    /* TODO: Borrar al terminar de implementar el servicio */
    debug_init: Ember.on('init', function() { window.exportar = this; }),

    FILE_VERSION: '0.2',
    /*
     * Descripción de format:
     *
     * En format se encuentran los archivos posibles del
     * formato en la estructura "nombre": método_a_ejecutar
     * para dejar separado el código de cada archivo del tar.gz
     *
     * `format.path` es un array que tiene la estructura
     * ["patrón", método_a_ejecutar], ante no encontrar nada en format
     * se chequean secuencialmente los patrones, **los más genéricos
     * deben ir más abajo**
     *
     * Los métodos llevan la la forma function(metadata, fstream, next, ritmo, match)
     *
     *   metadata: La data de la entry en el .tar (https://www.npmjs.com/package/tar-stream#headers).
     *   fstream:  El stream de la entry.
     *   next:     Callback a llamar al terminar de procesar la entry.
     *   ritmo:    Contexto que se mantiene mientras se decodea un proyecto de ritmos, es quién será
     *             devuelto por `load(path)`.
     *   match:    La razón por la cual se llamó a la función, representa la lista de matches del
     *             pattern.
     *
     * El `this` de los métodos es el servicio de exportación e importación
     */
    format: {
        "ritmo.json": function(metadata, fstream, next, ritmo) {
            streamToString(fstream, (json) => {
                Ember.merge(ritmo, JSON.parse(json));
                next();
            });
        },
        path: [
            [/.*/, function(metadata, fstream, next) {
                console.warn('Se ha encontrado un archivo que no correspondía:', metadata.name);
                next();
            }]
        ]
    },

    guardar(model) {
        /* Devuelvo la promesa: el que depositó rimos recibirá ritmos */
        return new Ember.RSVP.Promise((resolve) => {
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
                    model: model
                }
            ));

            /* Creo el compresor y me dispongo a recojer su output */
            let gz = zlib.createGzip();
            let data = [];
            /* Si hay data la agrego */
            gz.on('data', (zdata) => {
                data.push(toArrayBuffer(zdata));
            });
            /* Al final de todo cumplo mi promesa porque soy nene bueno */
            gz.on('end', () => {
                resolve(data);
            });

            proyecto.pipe(gz);
            proyecto.finalize();
        });
    },

    importar(path) {
        return new Ember.RSVP.Promise((resolve/*, reject*/) => {
            let ritmo = {};
            let file = fs.createReadStream(path);
            let gz = zlib.createGunzip();
            let proyecto = tar.extract();

            file.pipe(gz).pipe(proyecto);

            proyecto.on('entry', (metadata, fstream, next) => {
                let format = this.get('format');
                /* Si no hay un handler del archivo me fijo en los de los paths */
                if(format[metadata.name] === undefined) {
                    /* Los recorro uno a uno */
                    for(let index = 0; index < format.path.length; index++) {
                        let pattern = format.path[index][0];
                        let method = format.path[index][1];
                        /* Si matchea lo uso y terminé */
                        if(pattern.test(metadata.name)) {
                            method.call(this, metadata, fstream, next, ritmo, pattern.exec(metadata.name));
                            break;
                        }
                    }
                } else {
                    format[metadata.name].call(this, metadata, fstream, next, ritmo, [metadata.name]);
                }
            });

            proyecto.on('finish', () => {
                resolve(ritmo);
            });
        });
    }
});
