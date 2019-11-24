const gulp = require('gulp');

gulp.task('metalsmith:build', (cb) => {
    const metalsmith = require('../ds/metalsmith');
    metalsmith.build((err, files) => {
        if(err) throw err;
    });
    cb();
});

gulp.task('metalsmith:clean', () => {
    const del = require('del');
    return del(['./export']);
});

gulp.task('metalsmith', gulp.series('metalsmith:build'));