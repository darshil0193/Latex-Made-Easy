'use strict';
/**
 * @ngdoc directive
 * @name latexmadeeasyApp.directive:abstract
 * @description
 * # abstract
 */
let AbstractDirective = function() {
  return {
    templateUrl: 'views/abstract.html',
    restrict: 'E',
    controller: 'AbstractCtrl',
    controllerAs: 'ctrl',
    bindToController: true,
    scope: {
      abstract: '='
    }
  };
};

angular.module('latexmadeeasyApp').directive('abstract', AbstractDirective);
