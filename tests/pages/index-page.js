import PageObject from 'huayra-ritmos/tests/page-object';

let {
  visitable,
  clickable
} = PageObject;

export default PageObject.create({
  visit: visitable('/'),
  crearUnNuevoProyecto: clickable('button#crear-proyecto'),
});
