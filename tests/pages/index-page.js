import PageObject from 'huayra-ritmos/tests/page-object';

let {
  visitable,
  clickable
} = PageObject;

export default PageObject.create({
  visit: visitable('/'),
  crearUnNuevoProyecto: clickable('button#crear-proyecto'),
  colocarTitulo(nombre) {
    fillIn('#prompt-value', nombre);
    click('#prompt-aceptar');
  }
});
