var browserSync = require('browser-sync');
var del = require('del');
var gulp = require('gulp');
var runSequence = require('run-sequence');
var sass = require('gulp-sass');


// clean
gulp.task('clean', function (cb) {
	del(['public/'], cb);
});


// styles
gulp.task('styles', function () {
	return gulp.src('app/styles/main.scss')
		.pipe(sass({
			errLogToConsole: true
		}))
		.pipe(gulp.dest('public/styles'));
});


// html
gulp.task('html', function () {
	return gulp.src('app/*.html')
		.pipe(gulp.dest('public'));
});


// server
gulp.task('browser-sync', function () {
	browserSync({
		server: {
			baseDir: 'public'
		},
		notify: false
	});
});


// watch
gulp.task('watch', ['browser-sync'], function () {
	gulp.watch('app/styles/**/*.scss', ['styles', browserSync.reload]);
	gulp.watch('app/*.html', ['html', browserSync.reload]);
});


// default task
gulp.task('default', ['clean'], function () {
	runSequence(['styles', 'html'], 'watch');
});
