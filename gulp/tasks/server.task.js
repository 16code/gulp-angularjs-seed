module.exports = function(gulp, config, $, args, Logger) {
    var cors = function(req,res,next) {
        res.setHeader('Cache-Control', 'max-age=3600');
        next();
    }
    // server options use livereload
    var serverOptionsSrc = {
        root: './',
        port: 9000,
        host: 'www.defcom.dev',
        livereload: true,
        fallback: './src/index.html'
    }
    var serverOptionsDist = {
        root: './dist/',
        port: 8000,
        host: 'demo.defcom.dev',
        fallback: './dist/index.html',
        middleware: function () {
            return [cors];
        }
    }
    
    // http server root path src
    gulp.task('server:dev', ['inject:all', 'watch:js', 'watch:html', 'watch:less'] ,function() {
        $.connect.server(serverOptionsSrc);
    });
    
    // http server root path dist
    gulp.task('server:dist', function() {
        $.connect.server(serverOptionsDist);
    });
};
