var gulp = require('gulp');
var inspect = require('../gulp-inspect');
var xslt = require('../../');

gulp.src('src.xml')
    .pipe(inspect({ printFilePath: true }))
    .pipe(xslt('html-converter.xsl'))
    .pipe(inspect({
        message: 'note file extension automatically changed according to output method:',
        printFilePath: true
    }))
;
