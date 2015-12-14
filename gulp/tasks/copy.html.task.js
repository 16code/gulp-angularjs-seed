module.exports = function(gulp, config, $, args, Logger) {
        
    // 复制HTML文件
    gulp.task('copy:html', ['clean:dist'], function(){
        return gulp
            .src(config.htmlPath)
            .on('end', function(){ Logger('等待压缩HTML文件!'); })
            .pipe($.minifyhtml({conditionals: true,spare:false,empty:true,quotes:true}))
            .pipe(gulp.dest( config.distPath ))
            .on('end', function(){ Logger('压缩HTML文件完成!'); })
    });
    
};
