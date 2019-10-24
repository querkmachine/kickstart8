const config = require('../package.json');
const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const argv = require('yargs').argv;
const gulpif = require('gulp-if');

gulp.task('js:clean', () => {
	const del = require('del');
	return del(['./dist/js']);
});

gulp.task('js:watch', () => {
	gulp.watch('./src/js', gulp.parallel('js:compile'));
});

gulp.task('js:compile', (cb) => {
	const rollup = require('gulp-better-rollup');
	const babel = require('gulp-babel');
	const uglify = require('gulp-uglify');
	gulp.src('./src/js/**/*')
		.pipe(sourcemaps.init())
		.pipe(rollup({
			name: config.name,
			format: 'umd'
		}))
		.pipe(babel({
            presets: ['@babel/env']
        }))
		.pipe(gulpif(argv.minify, uglify()))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('./dist/js'));
	cb();
});

gulp.task('js',
	gulp.series(
		'js:clean',
		'js:compile'
	)
);