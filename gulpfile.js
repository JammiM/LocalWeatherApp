const gulp = require('gulp');
const uglify = require('gulp-uglify');
const pump = require('pump');
const sass = require('gulp-sass');
const pug = require('gulp-pug');
const babel = require('gulp-babel');
const bs = require('browser-sync').create(); // create a browser sync instance.

//Logs Message
gulp.task('message',function(){
  return console.log('Gulp is running ...');
});

gulp.task('default', ['serve', 'message', 'sass']);

//gulp.task('default', ['message', 'minify', 'sass']);
gulp.task('babel', function () {
  return gulp.src('src/es6/main.js')
    .pipe(babel())
    .pipe(gulp.dest('dist/js'))
    .pipe(gulp.dest('src/js'));
});


//mininfies the .js code
gulp.task('minify', function (callback) {
  pump([
        gulp.src('src/js/*.js'),
        uglify(),
        gulp.dest('dist/js')
        // .pipe(gulp.dest('dist/js'));
    ],
    callback
  );
});

//Compile Scss
gulp.task('sass',function(){
  gulp.src('src/sass/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('dist/css'))
      .pipe(bs.stream());
});


//Compile pug
gulp.task('pug',function(){
  return gulp.src('src/pug/*.pug')
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest('dist/'))
    .pipe(bs.stream());
});

//Browser sync
gulp.task('serve', ['sass'], function(){

  bs.init({
    server:  "./dist"
  });

  gulp.watch(['dist/scss/*.scss'], ['sass']);
  gulp.watch(['dist/*.html']).on('change', bs.reload);

});

//Watch everything
gulp.task('watch',function(){
//  gulp.watch('src/js/*.js', ['minify']);
  gulp.watch('src/sass/*.scss', ['sass']);
  gulp.watch('src/pug/*.pug', ['pug']);
});
