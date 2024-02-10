var gulp = require('gulp');
var concat = require('gulp-concat');
var build = require('./build');



gulp.task('build-combined', function (done) {
    var tasks = [
    'css-concat', 
    'js-concat'];
    // clean first and then start bundling
    return gulp.series(tasks, function (seriesDone) {
        seriesDone();
        done();
        console.log('Concat Completed. Successfully combined all CSS and JS files!');
    })();
});

gulp.task('css-concat', function (done) {
    return gulp.src([
    		'./dist/css/**/*.css',
    		'!./dist/css/combined.css'
    		])
        .pipe(concat('combined.css'))
        .pipe(gulp.dest('./dist/css'));
	done();
})
gulp.task('js-concat', function (done) {
    return gulp.src([
    	'./dist/js/**/*.js',
    	'!./dist/js/combined.js'
    	])
        .pipe(concat('combined.js'))
        .pipe(gulp.dest('./dist/js'));
	done();
})
