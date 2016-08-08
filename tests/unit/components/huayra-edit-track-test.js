import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('huayra-edit-track', 'Unit | Component | edit track', {
  // Specify the other units that are required for this test
  needs: ['component:x-slider', 'component:huayra-color-picker', 'component:huayra-sound-selector', /*'helper:bar'*/],
  unit: true
});

test('it renders', function(assert) {
  assert.expect(2);

  // Creates the component instance
  var component = this.subject();
  assert.equal(component._state, 'preRender');

  // Renders the component to the page
  this.render();
  assert.equal(component._state, 'inDOM');
});
