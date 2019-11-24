# Kickstart8

**Kickstart8 is still under development and is probably not ready to use yet.**

Kickstart8 is... version 8 of [Kickstart](https://github.com/querkmachine/kickstart), my personal project boilerplate.

It's a complete rewrite, aiming to modernise the original thing with some newer ideas:

- Design tokens that are separate to the Sass.
- Fully abstracted components: the HTML (well, Nunjucks), Sass, JS, and documentation for each component are all contained in a single folder.
- Make more use of Nunjucks macros and the ability to nest them inside one another.
- With abstraction, make it possible to only import certain components rather than loading everything for all of them in one go.
- Auto-generate as much documentation as possible. (One can dream...)
- Enforce more consistent code style, via use of [Prettier](https://prettier.io).

Kickstart8 is directly inspired by the open-source work being done over at [GOV.UK Frontend](http://github.com/alphagov/govuk-frontend) and [Adobe Spectrum](https://github.com/adobe/spectrum-css).

## Command line scripts

`npm run start`: Compiles tokens and assets in development mode, where code is expanded and changes are automatically compiled.

`npm run add <component-name>`: Adds a new component to the design system. This command creates a boilerplate component in the `components` directory that you can build upon.

`npm run build`: Compiles tokens and assets and puts them in the `dist` directory. Get minified versions by running `npm run build -- --minify`.

`npm run export`: Compiles tokens, minified assets and a static version of the Fractal system to the `export` directory.

`npm run prettify`: Automatically checks for code format breaches in all JavaScript, Sass, Yaml and Markdown files, correcting them automatically where possible.

`npm run clean`: Deletes compiled directories. Usually not necessary (the above two commands will run this for you), but there in case you need it.

## Updating namespaces

Namespaces are currently hardcoded in a couple of places. They need updating if you wanna change them:

- Pre-existing components don't update their namespace. You need to update them yourself.
- The `NAMESPACE` constant in `bin/add-component.sh` is used to determine the namespace for new boilerplated components.
- The `name` in `package.json` is used to namespace all JavaScript code, so that exported methods don't pollute the global namespace.
- Token namespaces need to be hardcoded manually. [Please let us automate this, Salesforce.](https://github.com/salesforce-ux/theo/issues/185)
