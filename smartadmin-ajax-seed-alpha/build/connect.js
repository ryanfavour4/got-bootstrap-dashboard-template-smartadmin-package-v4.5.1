var gulp = require('gulp');
var connect = require('gulp-connect');

gulp.task('connect', function (done) {
	connect.server({
		root: 'dist/',
		livereload: false,
		port: 4000,
		fallback: 'dist/intel_analytics_dashboard.html'
	});
	done();
})