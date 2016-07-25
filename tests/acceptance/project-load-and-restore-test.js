import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'huayra-ritmos/tests/helpers/start-app';

var application;

module('Acceptance | project load and restore', {
  beforeEach: function() {
    application = startApp();
  },

  afterEach: function() {
    //Ember.run(application, 'destroy');
  }
});

test('Puedo ir a la vista edición haciendo click en nuevo', function(assert) {
  visit('/');


  andThen(function() {
    assert.equal(find('h2').text().indexOf('huayra-ritmos'), 0, 'El título de la aplicación está presente');

    assert.ok(find('button').length > 0, 'existe al menos un botón');
  });
});
