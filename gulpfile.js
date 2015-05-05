var gulp         = require('gulp'),
    notify       = require('gulp-notify'),
    sass         = require('gulp-sass'),
    scssLint     = require('gulp-scss-lint'),
    rename       = require('gulp-rename'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss    = require('gulp-minify-css'),
    gutil        = require('gulp-util');


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



// TASK: sass
gulp.task('sass', function () {

    return gulp.src(['./source/*.scss'])
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
        .pipe(gulp.dest('./build'))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest('./build'));
});
