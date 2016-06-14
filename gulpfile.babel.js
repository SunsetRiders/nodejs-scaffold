'use strict';

import gulp from 'gulp';
import gulpif from 'gulp-if';
import plumber from 'gulp-plumber';
import yargs from 'yargs';
var argv = yargs.argv;
/* Stylesheets */
import sass from 'gulp-sass';
import csso from 'gulp-csso';
import autoprefixer from 'gulp-autoprefixer';
import sourcemaps from 'gulp-sourcemaps';
/* Javascript Lint */
import jshint from 'gulp-jshint';
import eslint from 'gulp-eslint';
/* Tests */
import mocha from 'gulp-spawn-mocha';

gulp.task('sass', () => {
  return gulp.src('public/css/main.sass')
    .pipe(plumber())
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(gulpif(argv.production, csso()))
    .pipe(gulp.dest('public/css'));
});

gulp.task('jshint', () => {
  return gulp.src('./**/*.js')
    .pipe(plumber())
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('eslint', () => {
  return gulp.src(['./**/*.js', '!node_modules/**'])
    .pipe(plumber())
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('test', () => {
  return gulp.src(['./**/*.js', '!node_modules/**'])
    .pipe(plumber())
    .pipe(mocha({
      env: {NODE_ENV: 'test'}
    }));
});

gulp.task('lint', ['jshint', 'eslint']);

gulp.task('watch', () => {
  gulp.watch('public/css/**/*.sass', ['sass']);
  gulp.watch('./**/*.js', ['lint', 'test']);
});

gulp.task('build', ['sass', 'lint']);
gulp.task('default', ['build', 'watch']);
gulp.task('build-prod', ['sass']);
