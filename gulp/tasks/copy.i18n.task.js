module.exports = function(gulp, config, $, args, Logger) {

    // i18n
    gulp.task('copy:i18n',['clean:dist'],function(){
        return gulp
            .src(config.srcPath + 'i18n/**/*')
            .pipe(gulp.dest( config.distPath + 'i18n' ))
            .on('end', function(){ Logger('复制语言文件完成 ' + config.distPath + 'i18n'); })
    });
};
