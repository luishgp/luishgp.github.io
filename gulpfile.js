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

  var injectStyles = gulp.src([
      // selects all css files from the .tmp dir
      paths.tmp + '/**/*.css'
    ], { read: false }
  );

  var injectScripts = gulp.src([
    // selects all js files from .tmp dir
    paths.tmp + '/**/*.js',
    // but ignores test files
    '!' + paths.src + '/**/*.test.js' 
    // then uses the gulp-angular-filesort plugin
    // to order the file injection
  ]).pipe(angularFilesort());
  // tell wiredep where your bower_components are
  var wiredepOptions = { 
    directory: 'bower_components'
  };

  return gulp.src(paths.src + '/*.html')
    .pipe(inject(injectStyles))
    .pipe(inject(injectScripts))
  //  .pipe(wiredep(wiredepOptions))
    // write the injections to the .tmp/index.html file
    .pipe(gulp.dest(paths.tmp)); 
    // so that src/index.html file isn't modified  
    // with every commit by automatic injects

});

// starts a development server
// runs preprocessor tasks before, 
// and serves the src and .tmp folders
gulp.task(  
    'serve', 
    ['inject'], 
    function () {
  browserSyncInit([
    '/',
    paths.src
  ], [
    paths.tmp + '/**/*.css',
    paths.tmp + '/**/*.js',
    paths.tmp + '/**/*.html'
  ]);
});

// starts a production server
// runs the build task before, 
// and serves the dist folder
gulp.task('serve:dist', ['build'], function () {  
  browserSyncInit(paths.dist);
});