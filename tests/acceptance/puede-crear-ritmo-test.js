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
    assert.equal(currentURL(), '', "Efectivamente pudo visitar la página.");
    click("#crear-proyecto");
  });

  andThen(function() {
    assert.ok((currentURL().indexOf('pattern') > -1), "Ingresó en la sección pattern.");
    click("#play-button");

    setTimeout(() => {
      click("#stop-button");
    }, 1000);
  });

});
