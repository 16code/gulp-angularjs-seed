module.exports = function(gulp, config, $, args, Logger) {
    // config -- gulp.config.js
    // $ -- gulp-load-plugins
    // args --- yargs
    var stylish = require('jshint-stylish');
    var jshintConfig = {
        lookup : true
    };
    
    // 清空目录
    gulp.task('clean:dist', function(cb) {
        return gulp
            .src(config.distPath , { read: false })
            .pipe($.rimraf({force: true }))
            .on('end', function(){ Logger('dist目录已清空!') })
            cb(err)
    });
    
    // 代码语法检查
    gulp.task('js:hint', function() {
        return gulp
            .src(config.devjs)
            .pipe($.jshint(jshintConfig))
            .pipe($.jshint.reporter(stylish))
            .on('end', function(){ Logger('代码语法检查完成!'); });
    });
    
    // 复制所有开发js文件
    gulp.task('copy:js', ['clean:dist','js:hint'], function(){
        return gulp
            .src(config.devjs)
            .pipe($.ngAnnotate())
            .pipe($.sourcemaps.init())
            .pipe($.concat('app.js'))
            .on('end', function(){ Logger('等待压缩文件!');})
            .pipe($.uglify())
            .on('end', function(){ Logger('文件压缩完成!');})
            .pipe($.sourcemaps.write('.'))
            .on('end', function(){ Logger('写入sourcemaps完成!');})
            .pipe(gulp.dest( config.publicPathJS ))
            .on('end', function(){ Logger('文件已被移到目标文件夹' + config.publicPathJS); })
    });
        
};
