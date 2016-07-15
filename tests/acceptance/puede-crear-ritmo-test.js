import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'huayra-ritmos/tests/helpers/start-app';

var application;

module('Acceptance | puede crear ritmo', {
  beforeEach: function() {
    application = startApp();
  },

  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

test('visiting /puede-crear-ritmo', function(assert) {
  visit('/');

  andThen(function() {
    assert.equal(currentURL(), '');
    click("button#crear-proyecto");
  });

  andThen(function() {
    click("button#play-button");
    assert.equal(currentURL().indexOf("pattern"), '1', "Ingresó a la ruta pattern");

    setTimeout(() => {
      click("button#stop-button");
    });
  });

});
