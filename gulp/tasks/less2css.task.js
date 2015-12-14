module.exports = function(gulp, config, $, args, Logger) {
    
    // less 2 css
    gulp.task('less2css', function() {
        return gulp
            .src(config.cssPath + 'less/app.less')
            .pipe($.watchless(config.cssPath + '**/*.less'))
            .pipe($.less())
            .pipe($.concat('app.css'))
            .pipe($.autoprefixer({browsers: ['last 2 versions']}))
            .pipe(gulp.dest(config.cssPath))
            .pipe($.connect.reload());
    });
    
    gulp.task('build:less2css', function() {
        return gulp
            .src(config.cssPath + 'less/app.less')
            .pipe($.less())
            .pipe($.concat('app.css'))
            .pipe($.autoprefixer({browsers: ['last 2 versions']}))
            .pipe(gulp.dest(config.cssPath));
    });
    
};
