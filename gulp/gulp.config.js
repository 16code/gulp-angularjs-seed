/**
 * @name gulp config
 * @description gulp 配置文件
 */
module.exports = function(){
    var srcPath = './src/';
    var htmlPath = [ srcPath + '**/**/*.html', '!./src/index.html','!./src/src-index.html'];
    var jsPath  = srcPath + 'app/';
    var cssPath = srcPath + 'css/';
    var distPath = './dist/';
    var imagesPath = srcPath + 'images/';
    var fontsPath = srcPath + 'fonts/';
    var config = {
        htmlPath: htmlPath,
        srcPath : srcPath,
        cssPath : cssPath,
        indexFile: srcPath + 'index.html',
        devjs: jsPath + '**/*.js',
        devhtml: srcPath + '**/*.html',
        css: cssPath + '**/*.css',
        distPath: distPath,
        publicPathJS : distPath + 'public/js',
        imagesPath : imagesPath + '**/**/*',
        fontsPath :   fontsPath + '**/**/*',
        filesGroup : {
            config     : jsPath + 'config/**/*.js' ,
            services   : jsPath + 'services/**/*.js' ,
            directives : jsPath + 'directives/**/*.js' ,
            controls   : jsPath + 'controls/**/*.js'
        }
    };
    return config;
}
