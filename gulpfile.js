const gulp = require('gulp');
const del = require('del');
var browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const gulpif = require('gulp-if');
const uncss = require('gulp-uncss');
const gcmq = require('gulp-group-css-media-queries');
const less = require('gulp-less');
const smartgrid = require('smart-grid');

const isDev = (process.argv.indexOf('--dev') !== -1);
const isProd = !isDev;
const isSync = (process.argv.indexOf('--sync') !== -1);



/*let cssFiles = [
    './src/css/styles.less',
];
*/

function clear() {
    return del('./build/*');
}

function styles() {
    return gulp.src('./src/css/styles.less')
        .pipe(sourcemaps.init())
        //.pipe(concat('styles.css'))
        .pipe(less())
        .pipe(uncss({
            html: ['./src/index.html']
        }))
        .pipe(autoprefixer({
            overrideBrowserslist: ['> 0.1%'],
            cascade: true
        }))
        .pipe(gcmq())
        .pipe(gulpif(isProd, cleanCSS({
            level: 2
        })))
        .pipe(gulpif(isDev, sourcemaps.write()))
        .pipe(gulp.dest('./build/css'))
        .pipe(gulpif(isSync, browserSync.stream()));
}

function html() {
    return gulp.src('./src/*.html')
        .pipe(gulp.dest('./build'))
        .pipe(gulpif(isSync, browserSync.stream()));
}

function img() {
    return gulp.src('./src/img/**/*')
        .pipe(gulp.dest('./build/img'));
}

function watch() {
    if (isSync) {
        browserSync.init({
            //tunnel: true,
            server: {
                baseDir: "./build/",
            }

        });
    }

    gulp.watch('./src/css/**/*', styles);
    gulp.watch('./src/**/*.html', html);
    gulp.watch('./smartgrid.js', grid);
    gulp.watch('./src/img/**/*', img);
}

function grid(done) {
    delete require.cache[require.resolve('./smartgrid')];
    let settings = require('./smartgrid.js');
    smartgrid('./src/css', settings);
    done();
}

let build = gulp.series(clear,
    gulp.parallel(styles, html, img));

gulp.task('build', build);
gulp.task('grid', grid);
gulp.task('watch', gulp.series(build, watch));







/*gulp.task('styles', styles);
gulp.task('html', html);
gulp.task('img', img);
gulp.task('clear', clear);*/