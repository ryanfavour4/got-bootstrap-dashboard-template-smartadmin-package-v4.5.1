var gulp = require('gulp');
var gutil = require('gulp-util');
var build = require('./build');
var func = require('./compile');

// merge with default parameters
var args = Object.assign({
	'prod': false
}, gutil.env);

if (args['prod'] !== false) {
	// force disable debug for production
	build.config.debug = false;
}

// task to bundle js/css
gulp.task('build-bundle', function (done) {
	console.log('==================> Generating bundles...');

	func.objectBuildTree(build.build, function (val) {
		if (typeof val.src !== 'undefined') {
			if (typeof val.bundle !== 'undefined') {
				func.bundle(val);
			}
			if (typeof val.output !== 'undefined') {
				func.output(val);
			}
		}
	});
	done();
});