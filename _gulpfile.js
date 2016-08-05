var gulp = require('gulp');
var browserSync = require('browser-sync');
var angularFilesort = require('gulp-angular-filesort');
var inject = require('gulp-inject');

function browserSyncInit(baseDir, files) {  
    browserSync.instance = browserSync.init(files, {
        startPath: '/', server: { baseDir: baseDir }
    });
}

var paths = {
    tmp: '.tmp',
    src: 'src',
    dist: 'dist'
}

gulp.task('inject', function () {

    var injectStyles = gulp.src([paths.src + '/**/*.css'], {read: false}, {relative: true});

    var injectScripts = gulp.src([paths.src + '/**/*.js'], {read: false}, {relative: true})
    .pipe(angularFilesort());

    var wiredepOptions = { 
        directory: 'bower_components'
    };

    return gulp.src(paths.src + '/*.html')
        .pipe(inject(injectStyles))
        .pipe(inject(injectScripts))
        .pipe(gulp.dest(paths.tmp)); 
});

gulp.task(  
    'serve', 
    ['inject'], 
    function () {
        browserSyncInit([
            paths.tmp,
            paths.src
        ], [
            paths.tmp + '/**/*.css',
            paths.tmp + '/**/*.js',
            paths.tmp + '/**/*.html'
        ]);
    });

gulp.task('serve:dist', ['build'], function () {  
    browserSyncInit(paths.dist);
});
