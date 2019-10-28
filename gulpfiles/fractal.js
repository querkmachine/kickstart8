const gulp = require('gulp');
const tokens = require('../dist/tokens/tokens.web.json');
const fractal = require('@frctl/fractal').create();
const mandelbrot = require('@frctl/mandelbrot');
const nunjucks = require('@frctl/nunjucks')({
	paths: ['components', 'docs'],
	globals: {
		tokens: tokens.props
	},
	filters: {
		theoTokenCategory: function(object, filterCategory) {
			let returnArray = [];
			Object.keys(object).forEach((key) => {
				const val = object[key];
				if(val.category === filterCategory) returnArray.push(val);
			});
			return returnArray.sort((a, b) => {
				if(a.name < b.name) return -1;
				if(a.name > b.name) return 1;
				return 0;
			});
		},
		theoTokenSass: function(string) {
			return `$${string.replace(/_/g, '-')}`;
		}
	}
});

fractal.set('project.title', `Kickstart your design system`);

fractal.components.engine(nunjucks);
fractal.components.set('ext', '.(html|njk)');
fractal.components.set('path', './components');
fractal.components.set('default.preview', '@preview');
fractal.components.set('default.status', 'prototype');
fractal.components.set('statuses', {
	prototype: {
		label: "Prototype",
		description: "Prototype code. Do not implement.",
		color: "#FF3333"
	},
	wip: {
		label: "Work in progress",
		description: "Unfinished and subject to change. Implement with caution.",
		color: "#FF9233"
	},
	readme: {
		label: "Needs documentation",
		description: "Code complete but missing documentation. Implement with caution.",
		color: "#176BC1"
	},
	ready: {
		label: "Ready",
		description: "Code and documentation complete. Ready to implement.",
		color: "#29CC29"
	}
});

fractal.docs.engine(nunjucks);
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