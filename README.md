# FinancasApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.0.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.



## With Docker

To start application in development configuration, you can use this command to generate the docker image
`docker build . -t financas-front:1.0.0 --build-arg TYPE_ENV=development`

If you want to use production enviroment, you don't need to pass TYPE_ENV. The production configuration is default in docker build image (see Dockerfile)

### Run a Container
After you did generate docker image, you can generate container from this docker command:
`docker run -p 4200:80 --name front financas-front:1.0.0`

or use docker-compose:
`docker-compose up`

