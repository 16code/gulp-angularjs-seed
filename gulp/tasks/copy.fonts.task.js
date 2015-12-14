module.exports = function(gulp, config, $, args, Logger) {

    // 复制字体
    gulp.task('copy:fonts',['clean:dist'],function(){
        return gulp
            .src(config.fontsPath)
            .pipe(gulp.dest( config.distPath + 'public/fonts/' ))
            .on('end', function(){ Logger('复制字体完成 ' + config.distPath + 'public/fonts/'); })
    });
};
