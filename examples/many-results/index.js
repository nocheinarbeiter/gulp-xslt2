var gulp = require('gulp');
var inspect = require('../gulp-inspect');
var xslt = require('../../');

gulp.src('src.xml')
    .pipe(xslt('many-res.xsl'))
    .pipe(inspect({ printFilePath: true }))
;
