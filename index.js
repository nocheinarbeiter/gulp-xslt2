var pathUtil = require('path');
var check = require('check-types');
var Vinyl = require('vinyl');
var createTransformStream = require('./lib/create-transform-stream');
var loadXsltTransformer = require('./lib/load-xslt-transformer');


const PLUGIN_NAME = 'gulp-xslt2';

var defaultOptions = {
    searchPaths: process.cwd(),
    extensionsToTransform: ['.xml', '.xhtml', '.svg', '.xsl', '.xsd']
};


function gulpXslt2(options, src) {
    var transformer;
    try {
        src = [].concat(src);
        check.assert.array.of.nonEmptyString(src,
            'expecting type of src: string | string[] (empty strings not allowed)'
        );
        transformer = loadXsltTransformer(src, options.searchPaths);
    } catch (error) {
        // throw new PluginError(PLUGIN_NAME, error); // plumber can't handle it
        return createTransformStream(PLUGIN_NAME, () => { throw error });
    }
    var transformFn = file => checkFileSkipped(file, options.extensionsToTransform) ? file : (
        transformer
            .transform({
                base: file.base,
                path: file.path,
                contents: file.contents.toString()
            })
            .map(result => new Vinyl({
                base: result.base,
                path: result.path,
                contents: new Buffer(result.contents)
            }))
    );
    return createTransformStream(PLUGIN_NAME, transformFn);
}


function checkFileSkipped(file, extensionsFilter) {
    if (! extensionsFilter){
        return false;
    }
    return ! extensionsFilter.includes(pathUtil.extname(file.path));
}


function initPlugin(options) {
    check.assert.maybe.object(options, 'options must be an object');
    options = Object.assign({}, defaultOptions, options);

    options.searchPaths = [].concat(options.searchPaths);
    check.assert.array.of.nonEmptyString(options.searchPaths,
        'expecting type of options.searchPaths: string | string[] (empty strings not allowed)'
    );
    options.searchPaths = options.searchPaths.map(path => pathUtil.resolve(path));
    check.assert.array.of.nonEmptyString(options.extensionsToTransform,
        'expecting type of options.extensionsToTransform: string[] (empty strings not allowed)'
    );
    var plugin = gulpXslt2.bind(null, options);
    plugin.init = initPlugin;
    return plugin;
}

module.exports = initPlugin();
