const gulp = require('gulp');
const uglify = require('uglify-es');
const pump = require('pump');
const sass = require('gulp-sass');
const pug = require('gulp-pug');
const babelCore = require('babel-core');
const babel = require('gulp-babel');

//Logs Message
gulp.task('message',function(){
  return console.log('Gulp is running ...');
});

gulp.task('default', ['message', 'sass']);
//gulp.task('default', ['message', 'minify', 'sass']);
gulp.task('babel', function () {
  return gulp.src('src/es6/main.js')
    .pipe(babel())
    .pipe(gulp.dest('dist/js'))
    .pipe(gulp.dest('src/js'));
});



/*
//mininfies the .js code
gulp.task('minify',function(cb){
  pump([
          gulp.src('src/js/*.js'),
              uglify(),
          gulp.dest('dist/js')

//              .pipe(gulp.dest('dist/js'));

  ],cb);
});
*/


//Compile Scss
gulp.task('sass',function(){
  gulp.src('src/sass/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('dist/css'));
});


//Compile pug
gulp.task('pug',function(){
  return gulp.src('src/pug/*.pug')
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest('dist/'));
});

//Watch everthing
gulp.task('watch',function(){
//  gulp.watch('src/js/*.js', ['minify']);
  gulp.watch('src/sass/*.scss', ['sass']);
  gulp.watch('src/pug/*.pug', ['pug']);
});
