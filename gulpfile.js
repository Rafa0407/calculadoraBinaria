var gulp = require('gulp');
var browserSync = require('browser-sync').create();

//this file contains the gulp task, reload the browser and whatch the files with new changes//

gulp.task('browserSync' , function(){
    browserSync.init({
      server: {
        baseDir: 'app'
      }
    })
});

gulp.task('watch' , ['browserSync'] ,  function(){
  gulp.watch('app/**/*.js', browserSync.reload);
  gulp.watch('app/templates/**/*.html', browserSync.reload);
  gulp.watch('app/*.html')
});

gulp.task('default' , ['watch']);
