var gulp = require('gulp')
var concat = require('gulp-concat');
var bower = require('gulp-bower');
var inject = require('gulp-inject');
var uglify = require('gulp-uglify');
var cssmin = require('gulp-cssmin');
var clean = require('gulp-clean');

var paths = {
    javascript: [
    'static/js/*.js'
    ],
    javascript_dist: [
    'static/dist/*.js'
    ],
    css: [
    'static/css/*.css'
    ],
    css_dist: [
    'static/dist/*.css'
    ]
};

gulp.task('concat-js', ['clean-dist'], function () {
    return gulp.src(paths.javascript)
    .pipe(concat('dist.js'))
    .pipe(gulp.dest('./static/dist/'));
});

gulp.task('concat-css', ['clean-dist'], function () {
    return gulp.src(paths.css)
    .pipe(concat('dist.css'))
    .pipe(gulp.dest('./static/dist/'));
});

gulp.task('bower', function () {
    return bower({ directory: './static/plugins/' })
    .pipe(gulp.dest('./static/dist/'))
});

gulp.task('inject-dev', ['min'], function () {
    return gulp.src('./templates/main-index.html')
        // inject js
        .pipe(inject(
            gulp.src(paths.javascript,
                {read: false}), {relative: false}))
        .pipe(gulp.dest('./templates/'))

        // inject css
        .pipe(inject(
            gulp.src(paths.css,
            {read: false}), {relative: false}))
        .pipe(gulp.dest('./templates/'));
});

gulp.task('inject-dist', ['min'], function () {
    return gulp.src('./templates/main-index.html')
        // inject js
        .pipe(inject(
            gulp.src(paths.javascript_dist,
                {read: false}), {relative: false}))
        .pipe(gulp.dest('./templates/'))

        // inject css
        .pipe(inject(
            gulp.src(paths.css_dist,
            {read: false}), {relative: false}))
        .pipe(gulp.dest('./templates/'));
});

gulp.task('uglify', ['concat-js'], function () {
    return gulp.src('./static/dist/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./static/dist'));
});

gulp.task('cssmin', ['concat-css'], function() {
    return gulp.src('./static/dist/*.css')
    .pipe(cssmin())
    .pipe(gulp.dest('./static/dist'));
});

gulp.task('clean-dist', function() {
    return gulp.src('static/dist/*', {read: false})
    .pipe(clean());
});

gulp.task('min', ['clean-dist', 'concat-js', 'uglify', 'concat-css', 'cssmin']);

gulp.task('dev', ['min', 'inject-dev']);

gulp.task('build', ['min', 'inject-dist']);

gulp.task('default', ['dev']);
