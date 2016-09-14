import PageObject from 'huayra-ritmos/tests/page-object';

let {
  visitable,
  clickable,
  count,
  text
} = PageObject;

export default PageObject.create({
  visit: visitable('/'),
  crearUnNuevoProyecto: clickable('button#crear-proyecto'),
  colocarTitulo(nombre) {
    fillIn('#prompt-value', nombre);
    click('#prompt-aceptar');
  },
  cantidadDeErrores: count(".huayra-prompt-note"),
  mensajeDeError: text(".huayra-prompt-note")

});
