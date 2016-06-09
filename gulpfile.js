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
var eslint = require('gulp-eslint');

gulp.task('sass', function() {
  return gulp.src('public/css/main.sass')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(sourcemaps.write({includeContent: false}))
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(autoprefixer())
    .pipe(gulpif(argv.production, csso()))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('public/css'));
});

gulp.task('jshint', function() {
  return gulp.src('./**/*.js')
    .pipe(plumber())
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('jscs', function() {
  return gulp.src('./**/*.js')
    .pipe(plumber())
    .pipe(jscs())
    .pipe(jscs.reporter());
});

gulp.task('eslint', function() {
  return gulp.src(['./**/*.js', '!node_modules/**'])
    .pipe(plumber())
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('lint', ['jshint', 'jscs', 'eslint']);

gulp.task('watch', function() {
  gulp.watch('public/css/**/*.sass', ['sass']);
  gulp.watch('./**/*.js', ['lint']);
});

gulp.task('build', ['sass', 'lint']);
gulp.task('default', ['build', 'watch']);
