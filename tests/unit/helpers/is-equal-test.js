import { isEqual } from '../../../helpers/is-equal';
import { module, test } from 'qunit';

module('Unit | Helper | is equal');

// Replace this with your real tests.
test('isEqual everyone=true or someone=false (default)', function(assert) {
  assert.equal(isEqual([42, 42, 42, 42], {}), true, 'Todos los valores fueron iguales');
  assert.equal(isEqual([42, 42, 2, 42], {}), false, 'Había algún valor distinto');
});

test('isEqual everyone=false or someone=true', function(assert) {
  assert.equal(isEqual([42, 2, 4, 42, 0], {everyone: false}), true, 'Había algún valor igual');
  assert.equal(isEqual([42, 1, 2, 3, 4], {someone: true}), false, 'No había ningún valor igual');
});
