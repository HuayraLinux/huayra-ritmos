import PageObject from 'huayra-ritmos/tests/page-object';

let {
  visitable,
  clickable,
  count
} = PageObject;

export default PageObject.create({
  play: clickable("#play-button"),
  stop: clickable("#stop-button"),

  elPlayerEstaReproduciendo: count('#play-button'),
  elPlayerEstaDetenido: count('#stop-button'),

  crearPista: clickable("#newTrack"),
  seleccionarSonido: clickable("a:contains('000_drum1')"),
  aceptarDialogo: clickable("button:contains('Agregar y cerrar')"),

  cantidadDePistas: count(".huayra-track")
});
