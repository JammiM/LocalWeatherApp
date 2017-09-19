const gulp = require('gulp');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const pug = require('gulp-pug');

//Logs Message
gulp.task('message',function(){
  return console.log('Gulp is running ...');
});

gulp.task('default', ['message', 'minify', 'sass']);

//mininfies the .js code
gulp.task('minify',function(){
  gulp.src('src/js/*.js')
      .pipe(uglify())
      .pipe(gulp.dest('dist/js'));
});

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
  gulp.watch('src/js/*.js', ['minify']);
  gulp.watch('src/sass/*.scss', ['sass']);
  gulp.watch('src/pug/*.pug', ['pug']);
});
