var map = require('vinyl-map2');
var colors = require('gulp-util').colors;

module.exports = (options) => map((contents, file) => {
    options && options.message && console.log(options.message);
    options && options.printFilePath && console.log(colors.magenta(file));
    console.log(colors.cyan(contents.toString()));
    return contents;
});
