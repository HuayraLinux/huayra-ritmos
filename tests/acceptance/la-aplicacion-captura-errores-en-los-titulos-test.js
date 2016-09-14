import { test } from 'qunit';
import moduleForAcceptance from 'huayra-ritmos/tests/helpers/module-for-acceptance';
import indexPage from '../pages/index-page';

moduleForAcceptance('Acceptance | la aplicacion captura errores en los titulos');

test('no puede cargar títulos incorrectos', function(assert) {
  indexPage.
    visit().
    crearUnNuevoProyecto().
    colocarTitulo("");

  andThen(function() {
    assert.equal(indexPage.cantidadDeErrores, 1, "Hay un error que impide avanzar.");
    assert.equal("El título no puede estar vacío", indexPage.mensajeDeError, "Aparece un mensaje de error porque el título está vacío.");

    assert.equal($("button#prompt-aceptar").attr('disabled'), 'disabled', "El botón está deshabilitado.");

    // Pero al ingresar un título le permite avanzar.
    fillIn("input", "un título válido");
  });


  andThen(function() {
    assert.equal($("button#prompt-aceptar").attr('disabled'), undefined, "Luego de ingresar un título habilita el botón de nuevo.");
    click("button#prompt-aceptar");
  });

  andThen(function() {
    assert.equal(currentURL().indexOf("pattern"), '1', "Ingresó a la ruta pattern");
  });

});
