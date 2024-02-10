"use strict";

var gulp = require('gulp');
var log = require('fancy-log');
var rtlcss = require('gulp-rtlcss');
var rename = require('gulp-rename');
var config = require('./../build.json');
var build = require('./build');

module.exports = config;

// entry point
gulp.task('build-rtlcss', function (done) {
    console.log('==================> converting all CSS to RTL');

    gulp
        .src('./dist/css/**/*.css')
        .pipe(rtlcss())
        .pipe(rename({ suffix: '-rtl' }))
        .pipe(gulp.dest('./dist/css/'))
        .on('end', function () {
            //log('=======> Building HTML pages...DONE!');
            console.log('==================> converting all CSS to RTL...DONE!');
            done();
        });
});