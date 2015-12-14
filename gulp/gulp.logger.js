/**
 * @name gulp logger
 * @description 控制台日志
 */
module.exports = function(){
    var gutil = require('gulp-util');
    var Logger = function(log){
        gutil.log(log);
    }
    return Logger;
}
