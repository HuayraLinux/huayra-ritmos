var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    'ember-font-awesome': {
      useScss: true,
      includeFontFiles: true
    }
  });

  app.import("bower_components/lato/css/lato.css");
  app.import("bower_components/lato/font/lato-bold/lato-bold.ttf", {destDir: "font/lato-bold"});

  app.import("bower_components/lato/font/lato-bold/lato-bold.ttf", {destDir: "font/lato-bold"});
  app.import("bower_components/lato/font/lato-bold/lato-bold.woff", {destDir: "font/lato-bold"});
  app.import("bower_components/lato/font/lato-bold/lato-bold.woff2", {destDir: "font/lato-bold"});

  app.import("bower_components/lato/font/lato-hairline/lato-hairline.ttf", {destDir: "font/lato-hairline"});
  app.import("bower_components/lato/font/lato-hairline/lato-hairline.woff", {destDir: "font/lato-hairline"});
  app.import("bower_components/lato/font/lato-hairline/lato-hairline.woff2", {destDir: "font/lato-hairline"});

  app.import("bower_components/lato/font/lato-light/lato-light.ttf", {destDir: "font/lato-light"});
  app.import("bower_components/lato/font/lato-light/lato-light.woff", {destDir: "font/lato-light"});
  app.import("bower_components/lato/font/lato-light/lato-light.woff2", {destDir: "font/lato-light"});

  app.import("bower_components/lato/font/lato-thin/lato-thin.ttf", {destDir: "font/lato-thin"});
  app.import("bower_components/lato/font/lato-thin/lato-thin.woff", {destDir: "font/lato-thin"});
  app.import("bower_components/lato/font/lato-thin/lato-thin.woff2", {destDir: "font/lato-thin"});

  app.import("bower_components/lato/font/lato-regular/lato-regular.ttf", {destDir: "font/lato-regular"});
  app.import("bower_components/lato/font/lato-regular/lato-regular.woff", {destDir: "font/lato-regular"});
  app.import("bower_components/lato/font/lato-regular/lato-regular.woff2", {destDir: "font/lato-regular"});

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  module.exports = app.toTree();
  return app.toTree();
};
