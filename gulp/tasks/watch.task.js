module.exports = function(gulp, config, $, args, Logger) {
    
    var wiredep = require('wiredep');
    
    gulp.task('server:reload', function() {
        gulp
            .src([config.devjs, config.devhtml])
            .pipe($.connect.reload());
    });
    
    // watch js files
    gulp.task('watch:js', ['inject:all'] , function() {
        gulp.watch(config.devjs, ['server:reload']);
    });

    // watch html files
    gulp.task('watch:html', function() {
        gulp.watch(config.devhtml, ['server:reload']);
    });
    
    // watch less files
    gulp.task('watch:less', function() {
        gulp.watch(config.cssPath + 'less/**/*.less', ['less2css']);
    });


};
