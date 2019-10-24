const gulp = require('gulp');
const fractal = require('@frctl/fractal').create();
const mandelbrot = require('@frctl/mandelbrot');
const nunjucks = require('@frctl/nunjucks')({
	paths: ['components']
});

fractal.set('project.title', `Design System`);

fractal.components.set('engine', nunjucks);
fractal.components.set('ext', '.(html|njk)');
fractal.components.set('path', './components');
fractal.components.set('default.preview', '@preview');
fractal.components.set('default.status', 'prototype');

fractal.docs.set('path', './docs');
fractal.docs.set('default.status', 'draft');

fractal.web.set('static.path', './dist');
fractal.web.set('builder.dest', './export');
fractal.web.theme(mandelbrot({
	'skin': 'black',
	'nav': ['docs', 'components'],
	'format': 'yaml'
}));

gulp.task('fractal:clean', () => {
	const del = require('del');
	return del(['./export']);
});

gulp.task('fractal:watch', () => {
	const logger = fractal.cli.console;
	const server = fractal.web.server({
		sync: true
	});
	server.on('error', (err) => {
		logger.error(err.message);
	});
	return server.start().then(() => {
		logger.success(`Fractal server is now running at ${server.url}.`);
	});
});

gulp.task('fractal', () => {
	const logger = fractal.cli.console;
	const builder = fractal.web.builder();
	builder.on('progress', (completed, total) => {
		logger.update(`Exported ${completed} of ${total} items.`, 'info');
	});
	builder.on('error', (err) => {
		logger.error(err.message);
	});
	return builder.build().then(() => {
		logger.success('Fractal build completed.');
	});
});