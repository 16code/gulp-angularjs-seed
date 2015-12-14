module.exports = function(gulp, config, $, args, Logger) {
    
    var pngquant = require('imagemin-pngquant');
    var jpgquant = require('imagemin-jpegtran');
    
    // 复制图片
    var imageminOptions = {
        optimizationLevel: 3,
        progressive: true,
        interlaced: true,
        use: [pngquant({optimizationLevel:3}),jpgquant({progressive: true})]
    }
    gulp.task('copy:images',['clean:dist','copy:background'],function(){
        return gulp
            .src(config.imagesPath)
            .on('end', function(){ Logger('等待压缩图片文件!'); })
            .pipe($.imagemin(imageminOptions))
            .pipe(gulp.dest( config.distPath + 'images' ))
            .on('end', function(){ Logger('压缩图片文件完成 ' +  config.distPath + 'images'); })
    });
    // css 背景图片
    gulp.task('copy:background',['clean:dist'],function(){
        return gulp
            .src([config.srcPath + 'css/**/*.svg', config.srcPath + 'css/**/*.png', config.srcPath + 'css/**/*.jpg'])
            .on('end', function(){ Logger('等待压缩背景图片文件!'); })
            .pipe($.imagemin(imageminOptions))
            .pipe(gulp.dest( config.distPath + 'public/images' ))
            .on('end', function(){ Logger('压缩背景图片文件完成 ' +   config.distPath + 'public/images' ); })
    });
    
    
};
