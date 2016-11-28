var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    browserify = require('gulp-browserify'),
    rename = require('gulp-rename');

gulp.task('default', ['browserify', 'watch']);

gulp.task('watch', function () {
    gulp.watch('Angular/**/*.js', ['browserify']);
});


gulp.task('browserify', function () {
    return gulp.src(['Angular/app.js'])
        .pipe(browserify())
        //.pipe(uglify())
        .pipe(rename('main.js'))
        .pipe(gulp.dest('Scripts/'))
});
