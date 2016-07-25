import Ember from 'ember';

export default Ember.Controller.extend({

    file: Ember.inject.service(),

    actions: {
      openDialog() {

        this.get('file').openDialog().
          then((d) => {
            alert("Archivo elegido " + d);
          }).
          catch(() => {
            alert("no eligio archivo.");
          });

      },

      saveDialog() {

        this.get('file').saveDialog().
          then((d) => {
            alert("Archivo elegido para guardar" + d);
          }).
          catch(() => {
            alert("no eligio archivo para guardar.");
          });

      },

      createTemporallyDirectory() {
        this.get('file').createTemporallyDirectory().then((d) => {
          alert("Se ha creado el directorio " + d);
        });
      },

      copyFileAndCompress() {
        var t = this.get('file').createTemporallyDirectory();
        var directory;

        t = t.then((d) => {
          directory = d;
          return this.get('file').copyFile('fonts/FontAwesome.otf', d);
        });

        t = t.then((d) => {
          alert("El archivo creado es " + d);
          alert("En el directorio " + directory);
          return this.get('file').compress(directory, "/Users/hugoruscitti/tmp123/hola.ritmos");
        });

        t.catch((e) => {
          alert("ERROR: " + e);
        });

      },

      openConfirmDialog() {
        this.showModal({
          template: 'modals/modal-confirm',
          controller: 'modal-confirm',
        });
      },

    }
});
