var gulp = require('gulp');
var config = require('./gulp.config')();
var Logger = require('./gulp.logger')();
var opt = {
    lazy: true,
    rename: {
        'gulp-minify-html'     : 'minifyhtml',
        'gulp-minify-css'      : 'minifycss',
        'gulp-imagemin'        : 'imagemin',
        'gulp-watch-less'      : 'watchless',
        'gulp-replace-task'    : 'replace'
    }
}
var $ = require('gulp-load-plugins')(opt);
var args = require('yargs').argv;
var taskList = require('fs').readdirSync('./gulp/tasks/');
taskList.forEach(function (file) {
    require('../gulp/tasks/' + file)(gulp, config, $, args, Logger);
});
gulp.task('default', $.taskListing)
