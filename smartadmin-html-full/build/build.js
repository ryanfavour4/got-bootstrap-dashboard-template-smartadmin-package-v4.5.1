var gulp = require('gulp');
var log = require('fancy-log');
var config = require('./../build.json');

module.exports = config;

// entry point
gulp.task('build', function (done) {
	var tasks = [
	'build-bundle', 
	'build-nav', 
	'build-html', 
	'watch',
	'connect'];
	// clean first and then start bundling
	return gulp.series(tasks, function (seriesDone) {
		seriesDone();
		done();
		log('Build Completed!');
	})();
});