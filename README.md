# HIRE-Web-App

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.8.

## Development server

Edit your `hosts` file (on Mac OS it's located here: `/etc/hosts`)

Add to your `hosts` file

`127.0.0.1 dimensiondata.hire.local`

`127.0.0.1 hellocrowd.hire.local`

`127.0.0.1 oauth.hire.local`

Run `ng serve` for a dev server.  

Navigate to `http://dimensiondata.hire.local:4444/`. 
The app will automatically reload if you change any of the source files.

As we work with subdomains, please setup https://tolocalhost.com/ to make authentication work.
Port: 4444
Hostname: oauth.hire.local
We need to use https://tolocalhost.com/ for a local development, because Google doesn't allow local addresses as Return URLs.

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
