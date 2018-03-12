'use strict';
/**
 * @ngdoc overview
 * @name latexmadeeasyApp
 * @description
 * # latexmadeeasyApp
 *
 * Main module of the application.
 */
let app = angular.module('latexmadeeasyApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngMaterial',
    'ngFileSaver',
    'ui.grid',
    'ui.grid.edit'
  ])
  .config(($routeProvider) => {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

app.constant('constants', {
  backendUrl: 'https://latex-made-easy-backend.herokuapp.com'
});
