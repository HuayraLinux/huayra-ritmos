/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');

var app = new EmberApp({
  emberCliFontAwesome: { includeFontAwesomeAssets: false }
});

app.import('bower_components/roboto-fontface/css/roboto-fontface.css');

app.import('bower_components/roboto-fontface/fonts/Roboto-Black.eot');
app.import('bower_components/roboto-fontface/fonts/Roboto-Black.svg');
app.import('bower_components/roboto-fontface/fonts/Roboto-Black.ttf');
app.import('bower_components/roboto-fontface/fonts/Roboto-Black.woff');
app.import('bower_components/roboto-fontface/fonts/Roboto-Black.woff2');
app.import('bower_components/roboto-fontface/fonts/Roboto-BlackItalic.eot');
app.import('bower_components/roboto-fontface/fonts/Roboto-BlackItalic.svg');
app.import('bower_components/roboto-fontface/fonts/Roboto-BlackItalic.ttf');
app.import('bower_components/roboto-fontface/fonts/Roboto-BlackItalic.woff');
app.import('bower_components/roboto-fontface/fonts/Roboto-BlackItalic.woff2');
app.import('bower_components/roboto-fontface/fonts/Roboto-Bold.eot');
app.import('bower_components/roboto-fontface/fonts/Roboto-Bold.svg');
app.import('bower_components/roboto-fontface/fonts/Roboto-Bold.ttf');
app.import('bower_components/roboto-fontface/fonts/Roboto-Bold.woff');
app.import('bower_components/roboto-fontface/fonts/Roboto-Bold.woff2');
app.import('bower_components/roboto-fontface/fonts/Roboto-BoldItalic.eot');
app.import('bower_components/roboto-fontface/fonts/Roboto-BoldItalic.svg');
app.import('bower_components/roboto-fontface/fonts/Roboto-BoldItalic.ttf');
app.import('bower_components/roboto-fontface/fonts/Roboto-BoldItalic.woff');
app.import('bower_components/roboto-fontface/fonts/Roboto-BoldItalic.woff2');
app.import('bower_components/roboto-fontface/fonts/Roboto-Light.eot');
app.import('bower_components/roboto-fontface/fonts/Roboto-Light.svg');
app.import('bower_components/roboto-fontface/fonts/Roboto-Light.ttf');
app.import('bower_components/roboto-fontface/fonts/Roboto-Light.woff');
app.import('bower_components/roboto-fontface/fonts/Roboto-Light.woff2');
app.import('bower_components/roboto-fontface/fonts/Roboto-LightItalic.eot');
app.import('bower_components/roboto-fontface/fonts/Roboto-LightItalic.svg');
app.import('bower_components/roboto-fontface/fonts/Roboto-LightItalic.ttf');
app.import('bower_components/roboto-fontface/fonts/Roboto-LightItalic.woff');
app.import('bower_components/roboto-fontface/fonts/Roboto-LightItalic.woff2');
app.import('bower_components/roboto-fontface/fonts/Roboto-Medium.eot');
app.import('bower_components/roboto-fontface/fonts/Roboto-Medium.svg');
app.import('bower_components/roboto-fontface/fonts/Roboto-Medium.ttf');
app.import('bower_components/roboto-fontface/fonts/Roboto-Medium.woff');
app.import('bower_components/roboto-fontface/fonts/Roboto-Medium.woff2');
app.import('bower_components/roboto-fontface/fonts/Roboto-MediumItalic.eot');
app.import('bower_components/roboto-fontface/fonts/Roboto-MediumItalic.svg');
app.import('bower_components/roboto-fontface/fonts/Roboto-MediumItalic.ttf');
app.import('bower_components/roboto-fontface/fonts/Roboto-MediumItalic.woff');
app.import('bower_components/roboto-fontface/fonts/Roboto-MediumItalic.woff2');
app.import('bower_components/roboto-fontface/fonts/Roboto-Regular.eot');
app.import('bower_components/roboto-fontface/fonts/Roboto-Regular.svg');
app.import('bower_components/roboto-fontface/fonts/Roboto-Regular.ttf');
app.import('bower_components/roboto-fontface/fonts/Roboto-Regular.woff');
app.import('bower_components/roboto-fontface/fonts/Roboto-Regular.woff2');
app.import('bower_components/roboto-fontface/fonts/Roboto-RegularItalic.eot');
app.import('bower_components/roboto-fontface/fonts/Roboto-RegularItalic.svg');
app.import('bower_components/roboto-fontface/fonts/Roboto-RegularItalic.ttf');
app.import('bower_components/roboto-fontface/fonts/Roboto-RegularItalic.woff');
app.import('bower_components/roboto-fontface/fonts/Roboto-RegularItalic.woff2');
app.import('bower_components/roboto-fontface/fonts/Roboto-Thin.eot');
app.import('bower_components/roboto-fontface/fonts/Roboto-Thin.svg');
app.import('bower_components/roboto-fontface/fonts/Roboto-Thin.ttf');
app.import('bower_components/roboto-fontface/fonts/Roboto-Thin.woff');
app.import('bower_components/roboto-fontface/fonts/Roboto-Thin.woff2');
app.import('bower_components/roboto-fontface/fonts/Roboto-ThinItalic.eot');
app.import('bower_components/roboto-fontface/fonts/Roboto-ThinItalic.svg');
app.import('bower_components/roboto-fontface/fonts/Roboto-ThinItalic.ttf');
app.import('bower_components/roboto-fontface/fonts/Roboto-ThinItalic.woff');
app.import('bower_components/roboto-fontface/fonts/Roboto-ThinItalic.woff2');


app.import('bower_components/boombox.js/boombox.js');
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
