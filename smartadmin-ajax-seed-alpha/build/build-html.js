// for html
var gulp = require('gulp');
var hb = require('gulp-hb');
var prettify = require('gulp-prettify');
var rename = require('gulp-rename');
var build = require('./build');

gulp.task('build-html', function (done) {
	console.log('==================> Building HTML pages');

	gulp
		/* handlebar page src */
		.src(build.config.path.src + '/content/**/*.hbs')
		.pipe(hb({
			partials: build.config.path.src + '/template/**/*.hbs',
			helpers: build.config.path.src + '/template/_helpers/*.js',
			data: build.config.data
		}))
		/* compile handlebars to html pages */
		.pipe(rename({
			extname: '.html'
		}))
		/* clear directory names */
		.pipe(rename({
			dirname: ''
		}))
		/* write html files */
		.pipe(prettify({
			indent_handlebars: true,
			indent_inner_html: true,
			preserve_newlines: true,
			end_with_newline: true,
			max_preserve_newlines: 0,
			brace_style: 'expand',
			indent_char: '  ',
			indent_size: 2
		}))
		.pipe(gulp.dest(build.config.dist.theme.path))
		.on('end', function () {
			//log('=======> Building HTML pages...DONE!');
			console.log('==================> Building HTML pages...DONE!');
			done();
		});
});