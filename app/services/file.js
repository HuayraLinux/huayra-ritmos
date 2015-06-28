import Ember from 'ember';

// Require:
//
//   npm install tmp
//
var fs = require('fs');
var path = require('path');

var tmp = require('tmp');
var archiver = require('archiver');


var {Promise} = Ember.RSVP;

export default Ember.Service.extend({

  openDialog: function() {
    var $ = Ember.$;

    return new Promise((resolve, reject) => {

      function chooseFile(name) {
        var chooser = $(name);

        chooser.change(function(evt) {
          var value = $(this).val();

          if (value) {
            resolve(value);
          } else {
            reject(value);
          }

        });

        chooser.trigger('click');
      }

      chooseFile('#openDialog');

    });
  },

  saveDialog: function() {
    var $ = Ember.$;

    return new Promise((resolve, reject) => {

      function chooseFile(name) {
        var chooser = $(name);

        chooser.change(function(evt) {
          var value = $(this).val();

          if (value) {
            resolve(value);
          } else {
            reject(value);
          }

        });

        chooser.trigger('click');
      }

      chooseFile('#saveDialog');

    });
  },

  createTemporallyDirectory: function() {
    return new Promise((resolve, reject) => {
      let options = {mode: 0750, prefix: 'myTmpDir_'};

      tmp.dir(options, function(err, path) {
        if (err) {
          reject(err);
        } else {
          resolve(path);
        }
      });
    });
  },

  copyFile: function(file_path, directory_path) {
    var path_from = file_path;
    var path_to = path.join(directory_path, path.basename(file_path));

    return new Promise((resolve, reject) => {

      var rd = fs.createReadStream(path_from);
      rd.on('error', reject);

      var wr = fs.createWriteStream(path_to);

      wr.on('error', reject);
      wr.on('finish', () => {
        resolve(path_to);
      });

      rd.pipe(wr);

    });

  },

  compress: function(path, target_file_path) {
    return new Promise((resolve, reject) => {

      var output = fs.createWriteStream(target_file_path);
      var archive = archiver('zip');

      output.on('close', function() {
        resolve({target_file_path: target_file_path, size: archive.pointer()});
      });

      archive.on('error', function(err) {
        reject(err);
      });

      archive.pipe(output);

      archive.bulk([{expand: true, cwd: path, src: ['**']}]);
      archive.finalize();

    });
  }

});
