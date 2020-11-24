# Log Application Frontend

This project was generated with Angular CLI version 9.1.1.

## Running with Database and Back-end

- Install or launch [PostgreSQL](https://www.postgresql.org/) at port 5432 * using the root * password.
- Execute the <b>log.data.sql </b> located at [sql folder](https://github.com/williamdsw/log-application-backend/tree/master/sql) in PostgreSQL.
- Import and launch the [Back-end application](https://github.com/williamdsw/log-application-backend) with Spring Tools Suite, Netbeans or Eclipse.
- Import and launch this application using NPM with command <b> ng-serve -o </b>.

- * You can use another port or password for PostgreSQL, but remember to reference them at 
[application.properties](https://github.com/williamdsw/log-application-backend/blob/master/src/main/resources/application.properties) in the Back-end project.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
