# gulp-xslt2

XSLT plugin for Gulp which uses [Java bridge](https://github.com/joeferner/node-java) to
[The Saxon XSLT and XQuery Processor from Saxonica Limited](http://www.saxonica.com/).

## Installation
```
npm install gulp-xslt2 -S
```

## Usage

### Initialization

```js
var xslt = require('gulp-xslt2');
```
which inits plugin with default options:
```js
{
    searchPaths: process.cwd(),
    extensionsToTransform: ['.xml', '.xhtml', '.svg', '.xsl', '.xsd']
}
```

New instance with different options:
```js
var xslt = require('gulp-xslt2').init({
    searchPaths: ['src1', 'src2'],
    extensionsToTransform: ['.xml']
});
```
Option `searchPaths` is used to resolve `xsl` files. It works like a PATH environment variable.

Files with extension unlisted in `extensionsToTransform` will directily pass to result stream without transformation.

### Piping
Unlike other plugins, the plugin uses [Node – Java Bridge](https://github.com/joeferner/node-java),
so it initializes Java only once at the beginning.
The following transformations take significantly less time
compared to the execution of separate child process for each step and each file.

```js
gulp.src('*.xml')
    .pipe(xslt('foo.xsl'))
    .pipe(xslt('bar.xsl'))
    /***/
    .pipe(xslt('zzz.xsl'))
    .pipe(gulp.dest('./results'))
;
```
### More then one result document
Documents created with `<xsl:result-document>` instruction are also added to output stream.


### Composite template
If several xslt templates are passed:
```js
.pipe(xslt('*.xsl')) // ...using globs
```
```js
.pipe(xslt(['foo.xsl', 'bar.xsl'])) // ...passing array
```
...the following template will be generated and transformed:
```xml
<xsl:stylesheet version="3.1">
    <xsl:include href="foo.xsl"/>
    <xsl:include href="bar.xsl"/>
    ...
</xsl:stylesheet>
```

### Troubleshooting: Popup dialog to install legacy JAVA SE 6 on macOS
It could be because the Oracle JDK does not advertise itself as available for JNI.
Please see [this issue](https://github.com/joeferner/node-java/issues/90#issuecomment-45613235)
for more details and manual workarounds.


## Examples
Please find brief demos of these features in `examples/` directory in the source repository.
