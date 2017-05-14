var pathUtil = require('path');
var globby = require('globby');
var XsltTransformer = require('node-xslt-java-bridge').XsltTransformer;


function loadXsltTransformer(src, searchPaths) {
    src = [].concat(src);
    var xsltPaths = src.reduce((res, item) => res.concat(searchSrc(item, searchPaths)), []);
    if (!xsltPaths.length) {
        var sep = '\n    ';
        throw new Error([
            'no xslt files found',
            '  src:' + sep + src.join(sep),
            '  searchPaths:' + sep + searchPaths.join(sep)
        ].join('\n'));
    }
    return new XsltTransformer(xsltPaths);
}

function searchSrc(item, searchPaths) {
    var res;
    for(var searchPath of searchPaths) {
        res = globby.sync(item, {cwd: searchPath});
        if (res.length) {
            res = res.map(path => pathUtil.join(searchPath, path));
            break;
        }
    }
    return res;
}

module.exports = loadXsltTransformer;
