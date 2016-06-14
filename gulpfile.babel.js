'use strict';

import gulp from 'gulp';
import gulpif from 'gulp-if';
import plumber from 'gulp-plumber';
import yargs from 'yargs';
var argv = yargs.argv;
/* Stylesheets */
import sass from 'gulp-sass';
import csso from 'gulp-csso';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import sourcemaps from 'gulp-sourcemaps';
/* Javascript Lint */
import jshint from 'gulp-jshint';
import eslint from 'gulp-eslint';
/* Tests */
import mocha from 'gulp-spawn-mocha';

gulp.task('sass', () => {
  return gulp.src('assets/styles/main.sass')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(sourcemaps.write({includeContent: false}))
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(postcss([autoprefixer({browsers: 'last 2 versions'})]))
    .pipe(gulpif(argv.production, csso()))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('public/css'));
});

gulp.task('lint', () => {
  return gulp.src(['assets/scripts/**/*.js', 'app/**/*.js', 'test/**/*.js'])
    .pipe(plumber())
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('test', () => {
  return gulp.src('test/**/*.js')
    .pipe(plumber())
    .pipe(mocha({
      env: {NODE_ENV: 'test'}
    }));
});

gulp.task('watch', () => {
  gulp.watch('assets/styles/**/*.sass', ['sass']);
  gulp.watch(['assets/scripts/**/*.js', 'app/**/*.js', 'test/**/*.js'], ['lint', 'test']);
});

gulp.task('build', ['sass', 'lint']);
gulp.task('default', ['build', 'watch']);
