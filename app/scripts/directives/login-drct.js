'use strict';

/**
 * @ngdoc directive
 * @name latexmadeeasyApp.directive:login
 * @description
 * # login
 */
let LoginDirective = function() {
  return {
    templateUrl: 'views/login.html',
    restrict: 'E',
    controller: 'LoginCtrl',
    controllerAs: 'ctrl',
    bindToController: true,
    scope: {
      successfulLogin: "="
    }
  };
};

angular.module('latexmadeeasyApp').directive('login', LoginDirective);
