import hbs from 'htmlbars-inline-precompile';
import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('huayra-edit-track', 'Integration | Component | edit track', {
  // Specify the other units that are required for this test
  integration: true
});

test('it renders', function(assert) {
  assert.expect(3);

  // Seteo el track a uno genérico
  this.set('track', {
    volume: 10,
    sound: 'sounds/basicos/000_drum1.wav',
    color: 'rojo'
  });

  // Chequeo todo al apretar guardar
  this.set('save', function(track, changes) {
    assert.equal(track.volume, changes.volume, "No hay cambios en el volumen");
    assert.equal(track.color, changes.color, "No hay cambios en el color");
    assert.equal(track.sound, changes.sound, "No hay cambios en el sonido");
  });

  // Renders the component to the page
  this.render(hbs`
    {{huayra-edit-track track=track onSave=save}}
  `);

  //TODO: Chequear que esté activo todo tal cual los parámetros del track
  this.$('button:contains(Aceptar)').click();
});
