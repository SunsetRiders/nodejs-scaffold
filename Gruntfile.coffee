'use strict'
module.exports = (grunt) ->

  require('load-grunt-tasks')(grunt)
  require('time-grunt')(grunt)

  # Project Configuration
  grunt.initConfig

    pkg: grunt.file.readJSON 'package.json'

    # Configuration
    settings:
      assetsDir: 'app/assets'
      pugDir: 'app/dev/views'
      htmlDir: 'app/views'
      sassDir: 'app/dev/styles'
      cssDir: 'app/styles'
      jsDir: 'app/scripts'
      testDir: 'app/dev/tests'

    # Compile JADE files to HTML
    pug:
      default:
        expand: true
        cwd: '<%= settings.pugDir %>'
        src: '**/*.pug'
        dest: '<%= settings.htmlDir %>'
        ext: '.html'
        options:
          pretty: true
      index:
        files:
          'index.html': 'index.pug'
        options:
          pretty: true

    # Compile SASS files to CSS
    sass:
      default:
        files:
          '<%= settings.cssDir %>/main.css': '<%= settings.sassDir %>/main.sass'
  		  options:
  			  sourcemap: 'auto'

    # Adds necessary vendor prefixes to CSS
    postcss:
      options:
        map: true
        processors: [
          require('autoprefixer')(
            browsers: ['last 2 versions', 'ie >= 9', 'and_chr >= 2.3']
            cascade: false
          )
        ]
      dist:
        src: '<%= settings.cssDir %>/main.css'
        dest: '<%= settings.cssDir %>/main.css'

    # Lints Javascript
    jshint:
      src: '<%= settings.jsDir %>/**/*.js'
      options:
        jshintrc: true

    jscs:
      src: '<%= settings.jsDir %>/**/*.js'
      options:
        config: '.jscsrc'

    mocha:
      test:
        src: '<%= settings.testDir %>/**/*.js'

    # Sets up a web server
    # connect:
    # 	app:
    # 		options:
    # 			base: ''
    # 			hostname: 'localhost'
    # 			livereload: true
    # 			middleware: (connect, options, middlewares) ->
    # 				express = require 'express'
    # 				routes = require './routes'
    # 				app = express()
    #
    # 				app.use express.static String(options.base)
    # 				routes app, options
    # 				middlewares.unshift app
    # 				middlewares
    # 			open: true
    # 			port: 0

    # Automate Tasks
    watch:
      markups:
        files: ['<%= settings.pugDir %>/**/*.pug']
        tasks: [
          'pug'
        ]
        options:
          livereload: true
      styles:
        files: ['<%= settings.sassDir %>/**/*.sass']
        tasks: [
          'sass'
          'postcss'
        ]
        options:
          livereload: true
      scripts:
        files: ['<%= settings.jsDir %>/**/*.js']
        tasks: [
          'jshint'
        ]
        options:
          livereload: true

  # Register Tasks
  grunt.registerTask 'common-build', [
    'pug'
    'sass'
    'postcss'
    'jshint'
    'jscs'
  ]

  grunt.registerTask 'dev', [
    'common-build'
    'watch'
  ]

  grunt.registerTask 'prod', [
    'common-build'
  ]

  grunt.registerTask 'default', [
    'dev'
  ]
  return
