// Config
const config = require('../config.json');

// Core build
const Metalsmith = require('metalsmith');
const collections = require('metalsmith-collections');
const layouts = require('metalsmith-layouts');
const markdown = require('metalsmith-markdown');
const permalinks = require('metalsmith-permalinks');
const env = require('metalsmith-env');
const inplace = require('metalsmith-in-place');

// CSS compilation
const sass = require('metalsmith-sass');
const postcss = require('metalsmith-postcss');

// JS compilation
const rollup = require('metalsmith-rollup');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const uglify = require('metalsmith-uglify');

module.exports = Metalsmith(__dirname)

    // Default metadata
    .metadata({
        title: '[TITLE NOT SET]'
    })

    // Source and destination directories
    .source(`../${config.paths.docs}`)
    .destination(`../${config.paths.export}`)

    // Clear out the destination every time we build
    .clean(true)

    // Include environmental variables in default metadata
    .use(env())

    // Define our collections, makes them accessible in templates under the
    // `collections` object. This doesn't include components, as we do some
    // funky stuff with those.
    .use(collections({
        designGuidelines: 'design-guidelines/*.md',
        guides: 'guides/*.md',
        styles: 'styles/*.md',
    }))

    // Compile Markdown to HTML
    .use(markdown())

    // Rewrite URLs into permalinks
    .use(permalinks())

    // Render Nunjucks in templates
    .use(inplace({
        pattern: '**/*.njk',
        engineOptions: {
            paths: [config.paths.viewLayouts, config.paths.viewPartials, config.paths.components],
            noCache: true,
            trimBlocks: true,
            lstripBlocks: true,
            smartypants: true,
            gfm: true,
            tables: true,
            pedantic: true
        }
    }))

    // Wrap our page HTML in a layout
    .use(layouts({
        default: 'layout.njk',
        directory: `../${config.paths.viewLayouts}`,
        engineOptions: {
            path: [config.paths.viewLayouts, config.paths.viewPartials, config.paths.components],

        }
    }))
