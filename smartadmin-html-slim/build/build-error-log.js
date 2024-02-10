'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var sassGlob = require('gulp-sass-glob');
var rewrite = require('gulp-rewrite-css');
var concat = require('gulp-concat');
var lazypipe = require('lazypipe');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var cleancss = require('gulp-clean-css');
var sourcemaps = require('gulp-sourcemaps');
var path = require('path');
var gutil = require('gulp-util');
var autoprefixer = require('gulp-autoprefixer');
var prettify = require('gulp-prettify');
var fs = require('fs');
var rtlcss = require('gulp-rtlcss');
var build = require('./build');
var args = Object.assign({
	'prod': false
}, gutil.env);

if (args['prod'] !== false) {
	build.config.debug = false;
	build.config.compile.jsUglify = true;
	build.config.compile.cssMinify = true;
}
var pump = require('pump');

gulp.task('build-error-logs', function (cb) {
  pump([
    gulp.src('./dist/**/*.js'),
    uglify(),
    gulp.dest('./_delete/_junk/')
  ], cb);
});