# IBC Ident Design System

## Asset compilation

CSS and JavaScript will be minified unless your your local environment has certain global variables configured.

You can set the environment variable for your current terminal session by running `export ENVIRONMENT=DEVELOPMENT` before running the asset compilation tasks.

To set the variable permanently, you can add the above line of code to your `.bashrc` file.  

## Command line scripts

`npm run start`: Compiles tokens and assets in development mode, where code is expanded and changes are automatically compiled. 

`npm run build`: Compiles tokens and assets and puts them in the `dist` directory. Get minified versions by running `npm run build -- --minify`. 

`npm run export`: Compiles tokens, minified assets and a static version of the Fractal system to the `export` directory. 

`npm run clean`: Deletes compiled directories. Usually not necessary (the above two commands will run this for you), but there in case you need it. 

`npm run add <component-name>`: Adds a new component to the design system. This command creates a boilerplate component in the `components` directory that you can build upon.