var gulp = require('gulp');
var gulpif = require('gulp-if');
var argv = require('yargs').argv;
var autoprefixer = require('gulp-autoprefixer');
var sass = require('gulp-sass');
var csso = require('gulp-csso');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var plumber = require('gulp-plumber');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');

gulp.task('sass', function() {
  return gulp.src('public/css/main.sass')
    .pipe(plumber())
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(gulpif(argv.production, csso()))
    .pipe(gulp.dest('public/css'));
});

gulp.task('jshint', function() {
  return gulp.src('./**/*.js')
    .pipe(plumber())
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('jscs', function() {
  return gulp.src('./**/*.js')
    .pipe(plumber())
    .pipe(jscs())
    .pipe(jscs.reporter());
});

gulp.task('lint', ['jshint', 'jscs']);

gulp.task('watch', function() {
  gulp.watch('public/css/**/*.sass', ['sass']);
  gulp.watch('./**/*.js', ['lint']);
});

gulp.task('build', ['sass', 'lint']);
gulp.task('default', ['build', 'watch']);
