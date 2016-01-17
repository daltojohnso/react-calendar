var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var watchify = require('watchify');
var babel = require('babelify');
var concat = require('gulp-concat');
var jasmine = require('gulp-jasmine');
var sass = require('gulp-sass');

function build(watch) {
    var bundler = watchify(
        browserify({
            entries: ['./src/js/main.js'],
            debug: true,
            extensions: [' ', 'js', 'jsx']
        }).transform(babel.configure({
            presets: ['es2015', 'stage-0', 'react']
        }))
    );

    function rebundle() {
        console.log('-> bundling...');
        bundler.bundle()
            .on('error', function(err) { console.error(err); this.emit('end'); })
            .pipe(source('build.js'))
            .pipe(buffer())
            .pipe(sourcemaps.init({ loadMaps: true }))
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest('./build'));
    }

    if (watch) {
        bundler.on('update', function() {
            rebundle();
        });
    }

    rebundle();
}

gulp.task('watch-build', function() {
    return build(true);
});

gulp.task('watch-style', function() {
    return gulp.watch(['src/sass/*scss'], ['sass']);
});

gulp.task('build', function() {return build();});

gulp.task('sass', function() {
    return gulp.src('src/sass/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('build/sass/css'))
        .pipe(concat('styles.css'))
        .pipe(gulp.dest('build'));
});

gulp.task('default', ['sass', 'watch-build', 'watch-style']);

function style() {
    return gulp.src('src/sass/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('build/sass/css'))
        .pipe(concat('style.css'))
        .pipe(gulp.dest('build'));
}

function test() {
    return gulp.src('spec/*.js')
        .pipe(jasmine());
}