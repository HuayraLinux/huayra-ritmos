import Ember from 'ember';
import SetNodeDirInitializer from 'huayra-ritmos/initializers/set-node-dir';
import { module, test } from 'qunit';

let application;

module('Unit | Initializer | set node dir', {
  beforeEach() {
    Ember.run(function() {
      application = Ember.Application.create();
      application.deferReadiness();
    });
  }
});

// Replace this with your real tests.
test('it works', function(assert) {
  SetNodeDirInitializer.initialize(application);

  // you would normally confirm the results of the initializer here
  assert.ok(true);
});
