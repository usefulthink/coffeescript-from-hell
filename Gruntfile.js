/* global module */

module.exports = function (grunt) {
  'use strict';

  grunt.task.loadNpmTasks('grunt-contrib-sass');
  grunt.task.loadNpmTasks('grunt-autoprefixer');
  grunt.task.loadNpmTasks('grunt-contrib-watch');
  grunt.task.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.task.loadNpmTasks('grunt-contrib-jshint');
  grunt.task.loadNpmTasks('grunt-contrib-csslint');
  grunt.task.loadNpmTasks('grunt-scss-lint');
  grunt.task.loadNpmTasks('grunt-contrib-connect');
  grunt.task.loadNpmTasks('grunt-closure-compiler');
  grunt.task.loadNpmTasks('grunt-browserify');
  grunt.task.loadNpmTasks('grunt-contrib-clean');

  grunt.initConfig({

    autoprefixer: {

      options: {
        browsers: ['last 2 version']
      },

      // prefix the specified file
      style: {
        src: 'tmp/css/style.unprefixed.css',
        dest: 'css/style.css'
      }

    },
    browserify: {
      dist: {
        files: {
          'tmp/js/bundle.js': ['src/scripts/index.js']
        },
        options: {}
      }
    },
    'closure-compiler': {
      build: {
        closurePath: 'compiler',
        js: 'tmp/js/bundle.js',
        jsOutputFile: 'js/bundle.min.js',
        maxBuffer: 500,
        options: {
          'compilation_level': 'SIMPLE_OPTIMIZATIONS'
        }
      }
    },
    scsslint: {
      allFiles: [
        'src/styles/*.scss'
      ],
      options: {
        config: '.scss-lint.yml',
        reporterOutput: 'log/scss-lint-report.xml',
        colorizeOutput: true
      }
    },
    // Before generating any new files, remove any previously-created files.
    //clean: {
    //  tests: ['tmp']
    //},
    csslint: {
      strict: {
        options: {
          csslintrc: '.csslintrc'
        },
        src: ['tmp/css/style.unprefixed.css']
      }
    },
    connect: {
      server: {
        options: {
          port: 8080
        }
      }
    },
    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: {
          'index.html': 'src/views/index.html'
        }
      }
    },
    sass: {
      dist: {
        options: {
          style: 'expanded'
        },
        files: {
          'tmp/css/style.unprefixed.css': 'src/styles/style.scss'
        }
      }
    },
    watch: {
      styles: {
        files: ['src/styles/*.scss'],
        tasks: ['build-scss']
      },
      css: {
        files: ['tmp/css/style.unprefixed.css'],
        tasks: ['build-css']
      },
      views: {
        files: ['src/views/*.html'],
        tasks: ['htmlmin']
      },
      scripts: {
        files: ['src/scripts/*.js'],
        tasks: ['build-scripts']
      },
      livereload: {
        files: ['css/style.css'],
        options: {
          livereload: true
        }
      }
    }
  });

  grunt.task.registerTask('build-scss', [
    'sass',
    'scsslint']);

  grunt.task.registerTask('build-scripts', [
    'browserify',
    'closure-compiler']);

  grunt.task.registerTask('build-css', [
    'csslint',
    'autoprefixer']);

  grunt.task.registerTask('default', [
    //'clean',
    'build-scripts',
    'build-scss',
    'build-css',
    'htmlmin',
    'connect',
    'watch']);

};