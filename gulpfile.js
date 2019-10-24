const gulp = require('gulp');
const requireDir = require('require-dir');

// Load in more tasks
requireDir('./gulpfiles');

// Bundled tasks
gulp.task('clean',
	gulp.parallel(
		'tokens:clean',
		'js:clean',
		'css:clean',
		'fonts:clean',
		'fractal:clean'
	)
);

gulp.task('watch',
	gulp.series(
		gulp.parallel(
			'tokens:watch',
			'js:watch',
			'css:watch',
			'fonts:watch',
			'fractal:watch'
		)
	)
);

gulp.task('build', 
	gulp.series(
		'tokens',
		gulp.parallel(
			'js',
			'css',
			'fonts',
			(cb) => cb()
		)
	)
);

gulp.task('export',
	gulp.series(
		'build',
		'fractal'
	)
);

gulp.task('default',
	gulp.parallel(
		'build',
		'watch',
		(cb) => cb()
	)
);