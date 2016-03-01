'use strict';

import config      from '../config';
import changed     from 'gulp-changed';
import gulp        from 'gulp';
import gulpif      from 'gulp-if';
import browserSync from 'browser-sync';

gulp.task('data', function() {

  return gulp.src(config.data.src)
    .pipe(changed(config.data.dest)) // Ignore unchanged files
    .pipe(gulp.dest(global.isProd ? config.data.prodDest : config.data.dest))
    .pipe(browserSync.stream({ once: true }));
});
