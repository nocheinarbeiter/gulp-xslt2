var through = require('through2');
var PluginError = require('gulp-util').PluginError;


function createTransformStream(pluginName, transformFn) {
    return through.obj(function(file, enc, cb) {
        if (file.isStream()) {
            this.emit('error', new PluginError(pluginName, 'Streams are not supported'));
            return cb();
        }
        if (file.isBuffer()) {
            var results;
            try {
                results = [].concat(transformFn(file));
            } catch (error) {
                this.emit('error', new PluginError(pluginName, error));
                return cb();
            }
            for (var res of results) {
                this.push(res);
            }
            return cb();
        }
        this.push(file);
        cb();
    });
}

module.exports = createTransformStream;
