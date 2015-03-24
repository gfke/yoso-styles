var gulp         = require('gulp'),
    del          = require('del'),
    notify       = require('gulp-notify'),
    sass         = require('gulp-sass'),
    scssLint     = require('gulp-scss-lint'),
    rename       = require('gulp-rename'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss    = require('gulp-minify-css')
    connect      = require('gulp-connect'),
    gutil        = require('gulp-util'),
    open         = require('gulp-open');


// Error notify handler
function notifyErrors() {
    var _args = Array.prototype.slice.call(arguments);

    /* Send error to notification center with gulp-notify */
    notify.onError({
        title: "Gulp Error",
        message: "<%= error.message %>"
    }).apply(this, _args);

    /* Keep gulp from hanging on this task */
    this.emit('end');
}


// TASK: clear
gulp.task('clear', function () {
    return del(['./docs/*.css']);
});


// TASK: sass
gulp.task('sass', function () {
    return gulp.src(['./source/*.scss', './doc_styles/*.scss'])
        .pipe(scssLint({
            'config': './lint.yml'
        }))
        .on('error', notifyErrors)
        .pipe(sass({
            sourceMap: true
        }))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(rename({
            dirname: '',
            extname: '.css'
        }))
        .pipe(gulp.dest('./docs'))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest('./docs'));
});

// TASK: http refresh
gulp.task('http-refresh', function () {
    return gulp.src('./docs/*.html').pipe(connect.reload());
});

gulp.task('watch', function () {
    var logFunction = function (event) {
        gutil.log(gutil.colors.green('File ' + event.path + ' was ' + event.type + ', running tasks...'));
    };

    // Create gulp watcher for scss files
    gulp.watch(['./source/**/*','./doc_styles/**/*'], ['sass']).on('change', logFunction);

    // Create gulp watcher for docs files
    gulp.watch('./docs/**/*', ['http-refresh']).on('change', logFunction);
});

gulp.task('http', ['sass'], function () {
    // config
    var connectConfig = {
        port: 8090,
        livereload: {
            ports: 35729
        },
        root: ['./docs']
    };

    // start http server
    return connect.server(connectConfig);
});

// TASK: serve
gulp.task('serve', ['sass', 'http', 'watch'], function () {

    gulp.src('./docs/index.html')
        .pipe(open('', {
            url: 'http://localhost:8090',
            app: 'Google Chrome'
        }));
});