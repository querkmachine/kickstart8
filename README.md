# Kickstart8

Kickstart8 is... version 8 of [Kickstart](https://github.com/querkmachine/kickstart), my personal project boilerplate.

It's a complete rewrite, aiming to modernise the original thing with some newer ideas:

- Fully abstracted components: the HTML (well, Nunjucks), Sass, JS, and documentation for each component are all contained in a single folder.
- Make more use of Nunjucks macros and the ability to nest them inside one another.
- With abstraction, make it possible to only import certain components rather than loading everything for all of them in one go.
- Auto-generate as much documentation as possible. (One can dream...)
- Enforce more consistent code style, via use of [Prettier](https://prettier.io).
- Move from node-sass to dart-sass and adopt the Sass module system.
- Use PostCSS to allow support for next generation CSS features (like logical properties) in browsers that don't yet support them.

Kickstart8 is directly inspired by the open-source work being done over at [GOV.UK Frontend](http://github.com/alphagov/govuk-frontend) and [Adobe Spectrum](https://github.com/adobe/spectrum-css).

## Command line scripts

`npm run start`: Compiles assets in development mode, where code is expanded and changes are automatically compiled.

`npm run add <component-name>`: Adds a new component to the design system. This command creates a boilerplate component in the `components` directory that you can build upon.

`npm run build`: Compiles assets and puts them in the `dist` directory. Get minified versions by running `npm run build -- --minify`.

`npm run export`: Compiles minified assets and a static version of the Fractal system to the `export` directory.

`npm run prettify`: Automatically checks for code format breaches in all files supported by Prettier (notably JS, Sass, Markdown and Yaml), correcting them automatically where possible. This currently uses the default Prettier configuration.

`npm run clean`: Deletes compiled directories. Usually not necessary (the above two commands will run this for you), but there in case you need it.

## Updating namespaces

Namespaces are currently hardcoded in a couple of places. They need updating if you wanna change them:

- Pre-existing components don't update their namespace. You need to update them yourself.
- The `NAMESPACE` constant in `bin/add-component.sh` is used to determine the namespace for new boilerplated components.
- The `namespace` option in `package.json` is used to namespace all JavaScript code, so that exported methods don't pollute the global namespace.
