var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();

//this file contains the gulp task, for pre compile SASS, reload the browser and whatch the files with new changes//

gulp.task('browserSync' , function(){
    browserSync.init({
      server: {
        baseDir: 'app'
      }
    })
});
gulp.task('sass', function(){
  return gulp.src('app/sass/**/*.scss') //path for scss files
  .pipe(sass())
  .pipe(gulp.dest('app/css')) // dest path for the css file
  .pipe(browserSync.reload({
    stream: true
  }))
});

gulp.task('watch' , ['browserSync', 'sass'] ,  function(){
  gulp.watch('app/sass/**/*.scss', ['sass']);

  gulp.watch('app/**/*.js', browserSync.reload);
  gulp.watch('app/templates/**/*.html', browserSync.reload);
  gulp.watch('app/*.html')
});

gulp.task('default' , ['watch']);
