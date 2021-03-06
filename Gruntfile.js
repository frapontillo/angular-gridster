'use_strict';

module.exports = function(grunt) {

  require('time-grunt')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    bump: {
      options: {
        files: ['package.json', 'bower.json'],
        updateConfigs: [],
        commit: false,
        push: false,
        commitMessage: 'Release v%VERSION%',
        commitFiles: ['package.json', 'bower.json']
      }
    },
    connect: {
      options: {
        port: 9000,
        hostname: 'localhost'
      },
      dev: {
        options: {
          open: true,
          livereload: 35729
        }
      },
      cli: {
        options: { }
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      src: {
        files: {
          src: ['src/*.js', 'test/**/*.js']
        },
      }
    },
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        background: true,
        singleRun: false
      },
      singleRun: {
        configFile: 'karma.conf.js',
        singleRun: true
      }
    },
    less: {
      dist: {
        options: {
          yuicompress: true
        },
        files: {
          "dist/angular-gridster.min.css": "src/angular-gridster.less"
        }
      }
    },
    protractor: {
      e2e: {
        options: {
          configFile: "ptor.conf.js",
          keepAlive: true,
          args: { }
        }
      }
    },
    uglify: {
      dist: {
        options: {
          banner: ['/*',
               ' * <%= pkg.name %>',
               ' * <%= pkg.homepage %>',
               ' *',
               ' * @version: <%= pkg.version %>',
               ' * @license: <%= pkg.license %>',
               ' */\n'].join('\n')
        },
        files: {
          'dist/angular-gridster.min.js': ['src/angular-gridster.js']
        }
      }
    },
    watch: {
      dev: {
        files: ['Gruntfile.js', 'karma.conf.js', 'ptor.conf.js', 'src/*', 'test/**/*.js'],
        tasks: ['jshint', 'uglify', 'less', 'karma:unit:run'],
        options: {
          reload: true,
          livereload: true,
          port: 35729
        }
      },
      e2e: { // separate e2e so livereload doesn't have to wait for e2e tests
        files: ['src/*', 'test/**/*.js'],
        tasks: ['protractor']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-bump');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-protractor-runner');


  grunt.registerTask('default', ['jshint', 'uglify', 'less']);

  grunt.registerTask('dev', ['connect:dev', 'karma:unit:start', 'karma:unit:run', 'watch:dev']);

  grunt.registerTask('e2e', ['watch:e2e', 'protractor']);

  grunt.registerTask('test', ['connect:cli', 'karma:singleRun', 'protractor']);

};
