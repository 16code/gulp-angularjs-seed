module.exports = function(gulp, config, $, args, Logger) {
    
    var wiredep = require('wiredep');
    var bowerFiles = require('main-bower-files');
    
    var replaceOptions = {
        usePrefix:false,
        patterns : []
    };
    if (args.devapi) {
        if (args.devapi.length > 20) {
            if (args.devapi.substr(-1) != '/') args.devapi += '/';
            replaceOptions.patterns.push(
                {
                    match: 'API_SERVER_PATH',
                    replacement: args.devapi
                }
            )
        } else {
            replaceOptions.patterns.push({
                match: 'API_SERVER_PATH',
                replacement: 'http://alpha.defara.com/api/'
            })
        }
    }
    
    // 复制常量文件到配置目录
    gulp.task('copy:config' , function(cb) {
        return gulp
            .src('./config/constant.config.js')
            .pipe($.replace(replaceOptions))
            .pipe(gulp.dest(config.srcPath + 'app/config/'));
            cb(err);
    });
    
    // inject bower files 注入所有的依赖包 css js
    gulp.task('inject:bower',['copy:config'], function(cb) {
        return gulp
            .src(config.srcPath + 'src-index.html')
            .pipe($.rename('index.html'))
            .pipe(gulp.dest(config.srcPath))
            .pipe(
                $.inject(
                    gulp.src(
                        bowerFiles(),{read:false}
                    ),
                    {name: 'bower',relative: true}
                )
            )
            .pipe(gulp.dest(config.srcPath));
            cb(err)
    })
    
    // inject util js
    gulp.task('inject:utiljs', ['inject:bower'], function(cb) {
        return gulp
            .src(config.indexFile)
            .pipe(
                $.inject(
                    gulp.src(
                        bowerFiles({includeDev: 'exclusive' }),
                        {read:false}
                    ),
                    {name: 'util',relative: true}
                )
            )
            .pipe(gulp.dest(config.srcPath));
            cb(err)
    })
    
    // 注入 app.js
    gulp.task('inject:app', ['inject:utiljs'] , function(cb) {
        return gulp
            .src(config.indexFile)
            .pipe(
                $.inject(
                    gulp.src(
                        [
                            config.css,
                            config.srcPath + '**/**/app.core.js',
                            config.srcPath + '**/**/app.js',
                            config.srcPath + '**/**/main.js'
                        ] ,
                        {read: false}
                    ),
                    { name: 'app', relative: true }
                )
            )
            .pipe(gulp.dest(config.srcPath));
            cb(err)
    });
    
    // 注入 config 目录下的js
    gulp.task('inject:config' ,['inject:app'], function(cb) {
        return gulp
            .src(config.indexFile)
            .pipe(
                $.inject(
                    gulp.src(
                        [ config.filesGroup.config ] ,
                        {read: false}
                    ),
                    { name: 'config' , relative: true }
                )
            )
            .pipe(gulp.dest(config.srcPath));
            cb(err)
    });
    
    // 注入 services 目录下的js
    gulp.task('inject:services' ,['inject:config'] , function(cb) {
        return gulp
            .src(config.indexFile)
            .pipe(
                $.inject(
                    gulp.src(
                        [ config.filesGroup.services ] ,
                        {read: false}
                    ),
                    { name: 'services' , relative: true }
                )
            )
            .pipe(gulp.dest(config.srcPath));
            cb(err)
    });
    
    // 注入 directives 目录下的js
    gulp.task('inject:directives' , ['inject:services'],  function(cb) {
        return gulp
            .src(config.indexFile)
            .pipe(
                $.inject(
                    gulp.src(
                        [ config.filesGroup.directives ] ,
                        {read: false}
                    ),
                    { name: 'directives' , relative: true }
                )
            )
            .pipe(gulp.dest(config.srcPath));
            cb(err);
    });
    
    // 注入 controls 目录下的js
    gulp.task('inject:controls' , ['inject:directives'],  function(cb) {
        return gulp
            .src(config.indexFile)
            .pipe(
                $.inject(
                    gulp.src(
                        [ config.filesGroup.controls ] ,
                        {read: false}
                    ),
                    { name: 'controls' , relative: true }
                )
            )
            .pipe(gulp.dest(config.srcPath));
            cb(err);
    });
    
    gulp.task('inject:all',['inject:controls']);
};
