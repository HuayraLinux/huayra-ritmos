import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'huayra-ritmos/tests/helpers/start-app';
import indexPage from '../pages/index-page';
import patternPage from '../pages/pattern-page';


var application;

module('Acceptance | puede cambiar pistas', {
  beforeEach: function() {
    application = startApp();
  },

  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

test('Puede cambiar pistas', function(assert) {
  indexPage.
    visit().
    crearUnNuevoProyecto().
    colocarTitulo("Demo");

  andThen(function() {
    assert.equal(currentURL().indexOf("pattern"), '1', "Ingresó a la ruta pattern");
    assert.equal(patternPage.cantidadDePistas, 2, "Hay dos pistas inicialmente.");
  });

  andThen(function() {
    patternPage.crearPista();
  });

  andThen(function() {
    patternPage.seleccionarSonido();
  });

  andThen(function() {
    patternPage.aceptarDialogo();
  });

  andThen(function() {
    assert.equal(patternPage.cantidadDePistas, 3, "Luego de agregar una pista, hay 3 en total.");
  });

});
