# Kickstart8

**Kickstart8 is still under development and is probably not ready to use yet.**

Kickstart8 is... version 8 of [Kickstart](https://github.com/querkmachine/kickstart), my personal project boilerplate. 

It's a complete rewrite, aiming to modernise the original thing with some newer ideas:

* Design tokens that are separate to the Sass.
* Fully abstracted components: the HTML, CSS, JS, and documentation for each one are all contained in a single folder.
* Make more use of Nunjucks macros and the ability to nest them inside one another.
* Auto-generate as much documentation as possible. (One can dream...)

## Command line scripts

`npm run start`: Compiles tokens and assets in development mode, where code is expanded and changes are automatically compiled. 

`npm run build`: Compiles tokens and assets and puts them in the `dist` directory. Get minified versions by running `npm run build -- --minify`. 

`npm run export`: Compiles tokens, minified assets and a static version of the Fractal system to the `export` directory. 

`npm run clean`: Deletes compiled directories. Usually not necessary (the above two commands will run this for you), but there in case you need it. 

`npm run add <component-name>`: Adds a new component to the design system. This command creates a boilerplate component in the `components` directory that you can build upon.