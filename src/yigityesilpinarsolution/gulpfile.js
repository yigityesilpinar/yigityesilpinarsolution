﻿/*
This file in the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkId=518007
*/

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var util = require('gulp-util');
gulp.task('vet', function () {
    gulp.src(['./node_modules/**/*']).pipe(gulp.dest('wwwroot/scripts/nodes/'));
});

