'use strict';

const { series, parallel } = require('gulp');

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    del = require('del'),
    browserSync = require('browser-sync'),
    imagemin = require('gulp-imagemin'),
    uglify = require('gulp-uglify'),
    usemin = require('gulp-usemin'),
    rev = require('gulp-rev'),
    cleanCss = require('gulp-clean-css'),
    flatmap = require('gulp-flatmap'),
    htmlmin = require('gulp-htmlmin');


function sass_compile() {
    return gulp.src('./css/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./css'));
};

function browser_sync() {
    var files = [
        './*.html',
        './css/*.css',
        './img/*.{png,jpg,gif}',
        './js/*.js'
    ];

    browserSync.init(files, {
        server: {
            baseDir: "./"
        }
    });
}

function sass_watch() {
    gulp.watch('./css/*.scss', sass_compile);
}

function clean() {
    return del(['dist']);
}

function copyfonts() {
    gulp.src('./node_modules/font-awesome/fonts/**/*.{ttf,woff,eof,svg}*')
        .pipe(gulp.dest('./dist/fonts'));
}

function image_min() {
    return gulp.src('img/*.{png,jpg,gif}')
        .pipe(imagemin({optimizationLevel: 3, progressive: true, interlaced: true}))
        .pipe(gulp.dest('dist/img'))
}

function use_min() {
    return gulp.src('./*.html')
        .pipe(flatmap((stream, file) => stream.pipe(usemin({
            css: [ rev() ],
            html: [ function() { return htmlmin({ collapseWhitespace: true })} ],
            js: [ uglify(), rev() ],
            inlinejs: [ uglify() ],
            inlinecss: [ cleanCss(), 'concat' ]
        }))))
        .pipe(gulp.dest('dist/'));
}

//
// gulp.task('build', gulp.series(
//     clean, copyfonts, image_min, use_min
// ));

// gulp.task(build);

exports.build = async function () {
    await del(['dist']);
    await copyfonts();
    await image_min();
    await use_min();
};
exports.default = series(browser_sync, sass_watch);

//series(clean, copyfonts, image_min, use_min);
