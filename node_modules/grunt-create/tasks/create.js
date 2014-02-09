/*
 * grunt-create
 * https://github.com/chajn/grunt-create
 *
 * Copyright (c) 2014 chajn
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('create', 'create dir and file', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      punctuation: '.',
      separator: ', '
    });
    for(var i in this.data.files){
        var file_arr = this.data.files[i];
        file_arr.forEach(function(filepath){
            if (!grunt.file.exists(filepath)) {
              grunt.file.write(filepath, options.banner+'\n');
              grunt.log.writeln('File "' + filepath + '" new created.');
            } else {
              grunt.log.writeln('File "' + filepath + '" old created.');
            }
        }); 
    }
  });
};
