module.exports = function(gulp, config, $, args, Logger) {
    var assets = $.useref.assets({searchPath: config.srcPath });
    var cssFilter = $.filter(['**/*.css','!/dist'],{restore: true});
    var jsFilter =  $.filter(['**/*.js','!/dist'],{restore: true});
    var replaceOptions = {
        usePrefix:false,
        patterns : [
            // constant variable
            {
                match: '../src/images',
                replacement:'../images'
            },
            {
                match: '<base href="/src/">',
                replacement:'<base href="/">'
            },
            {
                match: './public/',
                replacement:'../public/'
            },
            {
                match: 'url(../css/',
                replacement: 'url(../images/'
            }
        ]
    };
    if (args.api) {
        var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
            '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
        if (pattern.test(args.api)) {
            if (args.api.substr(-1) != '/') args.api += '/';
            replaceOptions.patterns.push(
                {
                    match: 'API_SERVER_PATH',
                    replacement: args.api
                }
            )
        } else {
            Logger('请输入一个正确的HTTP URL地址');
            return false;
        }
    };

    // build product
    gulp.task('build:product',['build:less2css','clean:dist','inject:all','copy:html','copy:images','copy:fonts','copy:i18n'], function(){
        return gulp
            .src(config.srcPath + 'index.html')
            .pipe(assets)
            .pipe(cssFilter)
            .on('end', function(){ Logger('正在压缩css文件!');})
            .pipe($.autoprefixer({browsers: ['last 2 versions']}))
            .pipe(cssFilter.restore)
            .pipe(jsFilter)
            .pipe($.sourcemaps.init())
            .pipe($.ngAnnotate())
            .pipe($.stripDebug())
            .pipe($.uglify())
            .on('end', function(){ Logger('正在压缩js文件!');})
            .pipe($.sourcemaps.write('.'))
            .pipe(jsFilter.restore)
            .pipe($.rev())
            .pipe(assets.restore())
            .pipe($.useref())
            .pipe($.revReplace())
            .pipe($.replace(replaceOptions))
            .pipe($.if('*.css', $.minifycss()))
            .pipe($.if('*.html', $.minifyhtml({conditionals: true,spare:false,empty:true,quotes:true}) ))
            .pipe(gulp.dest( config.distPath ))
            .pipe($.size({ title:'file:', showFiles: true }))
            .on('end', function(){ Logger('Build index done' + config.distPath); })
    });
    
};
