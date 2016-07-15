/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');

var app = new EmberApp({
  emberCliFontAwesome: { includeFontAwesomeAssets: false }
});

app.import('app/styles/app.css');

app.import('bower_components/roboto-fontface/css/roboto-fontface.css');

app.import('bower_components/roboto-fontface/fonts/Roboto-Black.eot', {destDir: 'fonts'});
app.import('bower_components/roboto-fontface/fonts/Roboto-Black.svg', {destDir: 'fonts'});
app.import('bower_components/roboto-fontface/fonts/Roboto-Black.ttf', {destDir: 'fonts'});
app.import('bower_components/roboto-fontface/fonts/Roboto-Black.woff', {destDir: 'fonts'});
app.import('bower_components/roboto-fontface/fonts/Roboto-Black.woff2', {destDir: 'fonts'});
app.import('bower_components/roboto-fontface/fonts/Roboto-BlackItalic.eot', {destDir: 'fonts'});
app.import('bower_components/roboto-fontface/fonts/Roboto-BlackItalic.svg', {destDir: 'fonts'});
app.import('bower_components/roboto-fontface/fonts/Roboto-BlackItalic.ttf', {destDir: 'fonts'});
app.import('bower_components/roboto-fontface/fonts/Roboto-BlackItalic.woff', {destDir: 'fonts'});
app.import('bower_components/roboto-fontface/fonts/Roboto-BlackItalic.woff2', {destDir: 'fonts'});
app.import('bower_components/roboto-fontface/fonts/Roboto-Bold.eot', {destDir: 'fonts'});
app.import('bower_components/roboto-fontface/fonts/Roboto-Bold.svg', {destDir: 'fonts'});
app.import('bower_components/roboto-fontface/fonts/Roboto-Bold.ttf', {destDir: 'fonts'});
app.import('bower_components/roboto-fontface/fonts/Roboto-Bold.woff', {destDir: 'fonts'});
app.import('bower_components/roboto-fontface/fonts/Roboto-Bold.woff2', {destDir: 'fonts'});
app.import('bower_components/roboto-fontface/fonts/Roboto-BoldItalic.eot', {destDir: 'fonts'});
app.import('bower_components/roboto-fontface/fonts/Roboto-BoldItalic.svg', {destDir: 'fonts'});
app.import('bower_components/roboto-fontface/fonts/Roboto-BoldItalic.ttf', {destDir: 'fonts'});
app.import('bower_components/roboto-fontface/fonts/Roboto-BoldItalic.woff', {destDir: 'fonts'});
app.import('bower_components/roboto-fontface/fonts/Roboto-BoldItalic.woff2', {destDir: 'fonts'});
app.import('bower_components/roboto-fontface/fonts/Roboto-Light.eot', {destDir: 'fonts'});
app.import('bower_components/roboto-fontface/fonts/Roboto-Light.svg', {destDir: 'fonts'});
app.import('bower_components/roboto-fontface/fonts/Roboto-Light.ttf', {destDir: 'fonts'});
app.import('bower_components/roboto-fontface/fonts/Roboto-Light.woff', {destDir: 'fonts'});
app.import('bower_components/roboto-fontface/fonts/Roboto-Light.woff2', {destDir: 'fonts'});
app.import('bower_components/roboto-fontface/fonts/Roboto-LightItalic.eot', {destDir: 'fonts'});
app.import('bower_components/roboto-fontface/fonts/Roboto-LightItalic.svg', {destDir: 'fonts'});
app.import('bower_components/roboto-fontface/fonts/Roboto-LightItalic.ttf', {destDir: 'fonts'});
app.import('bower_components/roboto-fontface/fonts/Roboto-LightItalic.woff', {destDir: 'fonts'});
app.import('bower_components/roboto-fontface/fonts/Roboto-LightItalic.woff2', {destDir: 'fonts'});
app.import('bower_components/roboto-fontface/fonts/Roboto-Medium.eot', {destDir: 'fonts'});
app.import('bower_components/roboto-fontface/fonts/Roboto-Medium.svg', {destDir: 'fonts'});
app.import('bower_components/roboto-fontface/fonts/Roboto-Medium.ttf', {destDir: 'fonts'});
app.import('bower_components/roboto-fontface/fonts/Roboto-Medium.woff', {destDir: 'fonts'});
app.import('bower_components/roboto-fontface/fonts/Roboto-Medium.woff2', {destDir: 'fonts'});
app.import('bower_components/roboto-fontface/fonts/Roboto-MediumItalic.eot', {destDir: 'fonts'});
app.import('bower_components/roboto-fontface/fonts/Roboto-MediumItalic.svg', {destDir: 'fonts'});
app.import('bower_components/roboto-fontface/fonts/Roboto-MediumItalic.ttf', {destDir: 'fonts'});
app.import('bower_components/roboto-fontface/fonts/Roboto-MediumItalic.woff', {destDir: 'fonts'});
app.import('bower_components/roboto-fontface/fonts/Roboto-MediumItalic.woff2', {destDir: 'fonts'});
app.import('bower_components/roboto-fontface/fonts/Roboto-Regular.eot', {destDir: 'fonts'});
app.import('bower_components/roboto-fontface/fonts/Roboto-Regular.svg', {destDir: 'fonts'});
app.import('bower_components/roboto-fontface/fonts/Roboto-Regular.ttf', {destDir: 'fonts'});
app.import('bower_components/roboto-fontface/fonts/Roboto-Regular.woff', {destDir: 'fonts'});
app.import('bower_components/roboto-fontface/fonts/Roboto-Regular.woff2', {destDir: 'fonts'});
app.import('bower_components/roboto-fontface/fonts/Roboto-RegularItalic.eot', {destDir: 'fonts'});
app.import('bower_components/roboto-fontface/fonts/Roboto-RegularItalic.svg', {destDir: 'fonts'});
app.import('bower_components/roboto-fontface/fonts/Roboto-RegularItalic.ttf', {destDir: 'fonts'});
app.import('bower_components/roboto-fontface/fonts/Roboto-RegularItalic.woff', {destDir: 'fonts'});
app.import('bower_components/roboto-fontface/fonts/Roboto-RegularItalic.woff2', {destDir: 'fonts'});
app.import('bower_components/roboto-fontface/fonts/Roboto-Thin.eot', {destDir: 'fonts'});
app.import('bower_components/roboto-fontface/fonts/Roboto-Thin.svg', {destDir: 'fonts'});
app.import('bower_components/roboto-fontface/fonts/Roboto-Thin.ttf', {destDir: 'fonts'});
app.import('bower_components/roboto-fontface/fonts/Roboto-Thin.woff', {destDir: 'fonts'});
app.import('bower_components/roboto-fontface/fonts/Roboto-Thin.woff2', {destDir: 'fonts'});
app.import('bower_components/roboto-fontface/fonts/Roboto-ThinItalic.eot', {destDir: 'fonts'});
app.import('bower_components/roboto-fontface/fonts/Roboto-ThinItalic.svg', {destDir: 'fonts'});
app.import('bower_components/roboto-fontface/fonts/Roboto-ThinItalic.ttf', {destDir: 'fonts'});
app.import('bower_components/roboto-fontface/fonts/Roboto-ThinItalic.woff', {destDir: 'fonts'});
app.import('bower_components/roboto-fontface/fonts/Roboto-ThinItalic.woff2', {destDir: 'fonts'});


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
