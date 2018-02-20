'use strict';

/**
 * @ngdoc directive
 * @name latexmadeeasyApp.directive:startupPage
 * @description
 * # startupPage
 */

let StartupPageDirective = function() {
  return {
    templateUrl: 'views/startup-page.html',
    restrict: 'E',
    controller: 'StartupPageCtrl',
    controllerAs: 'ctrl',
    bindToController: true
  };
};

angular.module('latexmadeeasyApp').directive('startupPage', StartupPageDirective);
