var gulp = require('gulp');
var plumber = require('gulp-plumber');
var inspect = require('../gulp-inspect');
var xslt = require('../../');

gulp.src(['divide-by-zero.xml', 'divide-by-ten.xml'])
    .pipe(plumber())
    .pipe(inspect({ printFilePath: true }))
    .pipe(xslt('divider.xsl'))
    .pipe(inspect())
;
