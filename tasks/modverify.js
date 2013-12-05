/*
 * grunt-modverify
 * https://github.com/evanlucas/grunt-modverify
 *
 * Copyright (c) 2013 Evan Lucas
 * Licensed under the MIT license.
 */

'use strict';

var verify = require('modverify')
  , path = require('path')

module.exports = function(grunt) {

  grunt.registerMultiTask('modverify', 'Verify that your dependencies are registered in your package.json', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      punctuation: '.',
      separator: ', ',
      fileFilter: ['*.js'],
      directoryFilter: ['!.git', '!components', '!bower_components', '!node_modules'],
      excludes: []
    });

    var async = this.async()

    verify.processForDir(process.cwd(), options, function(err, output) {
      if (err) {
        grunt.fatal(err)
      }
      var pkg = require(path.join(process.cwd(), 'package.json'))
        , deps = pkg.dependencies
        , devDeps = pkg.devDependencies || {}
        , optDeps = pkg.optionalDependencies || {}
        , modules = output.modules
        , relativeModules = output.relativeModules

      grunt.log.write('Checking dependencies...')
      modules.forEach(function(mod) {
        if (deps.hasOwnProperty(mod)) {
          grunt.verbose.writeln(mod, 'is registered as a dependency')
        } else if (devDeps.hasOwnProperty(mod)) {
          grunt.verbose.writeln(mod, 'is registered as a dev dependency')
        } else if (optDeps.hasOwnProperty(mod)) {
          grunt.verbose.writeln(mod, 'is registered as an optional dependency')
        } else {
          if (~options.excludes.indexOf(mod)) {
            grunt.verbose.writeln('Excluding '+mod)
            return
          }
          grunt.log.error(mod, 'is NOT registered as a dependency')
          grunt.fatal('Check your package.json')
        }
      })
      grunt.log.ok()

      grunt.log.write('Checking relative dependencies...')
      var keys = Object.keys(relativeModules)
      keys.forEach(function(key) {
        if (!verify.fileWithNameExists(key)) {
          if (options.excludes.indexOf(key)) {
            grunt.verbose.writeln('Excluding '+key)
            return
          }
          grunt.log.error(key, 'does not exist')
          grunt.log.error('It is referenced from the following files:')
          var refs = relativeModules[key]
          refs.forEach(function(r, index) {
            grunt.log.error(' - ', index, ' ', r)
          })
          grunt.fatal('Check your package.json')
        }
      })
      grunt.log.ok()
      async()
    })
  });

};
