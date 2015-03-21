var gulp         = require('gulp'),
    del          = require('del'),
    notify       = require("gulp-notify"),
    sass         = require('gulp-sass'),
    scssLint     = require('gulp-scss-lint'),
    rename       = require('gulp-rename'),
    autoprefixer = require('gulp-autoprefixer'),
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
    return del(['./test/*.css']);
});


// TASK: sass
gulp.task('sass', ['clear'], function () {
    gulp.src('./styles/*.scss')
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
            dirname: "",
            //basename: "aloha",
            //prefix: "bonjour-",
            //suffix: "-hola",
            extname: ".css"
        }))
        .pipe(gulp.dest('./test'));
});

// TASK: http refresh
gulp.task('http-refresh', function () {
    gulp.src('./test/index.html')
        .pipe(connect.reload());
});

// TASK: serve
gulp.task('serve', ['clear', 'sass'], function () {
    // config
    var connectConfig = {
        port: 8090,
            livereload: {
            ports: 35729
        },
        root: ['./test']
    };

    var logFunction = function (event) {
        gutil.log(gutil.colors.green('File ' + event.path + ' was ' + event.type + ', running tasks...'));
    };

    // start http server
    connect.server(connectConfig);

    // Create gulp watcher for scss files
    gulp.watch(['./styles/**/*.scss'], ['sass']).on('change', logFunction);

    // Create gulp watcher for test files
    gulp.watch(['./test/**/*'], ['http-refresh']).on('change', logFunction);

    gulp.src('./test/index.html')
        .pipe(open('', {
            url: 'http://localhost:8090'
            //app: 'firefox'
        }));

});