/*
 * grunt-modverify
 * https://github.com/evanlucas/grunt-modverify
 *
 * Copyright (c) 2013 Evan Lucas
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Configuration to be run (and then tested).
    modverify: {
      default_options: {
        options: {
          fileFilter: ['*.js'],
          directoryFilter: ['!.git', '!components', '!bower_components', '!node_modules'],
          excludes: ['../testfile']
        }
      }
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks')

  // These plugins provide necessary tasks.
/*   grunt.loadNpmTasks('grunt-cafe-mocha') */

  // By default, lint and run all tests.
  grunt.registerTask('default', ['modverify'])

};
