'use strict';
/**
 * @ngdoc directive
 * @name latexmadeeasyApp.directive:dedication
 * @description
 * # dedication
 */
let DedicationDirective = function() {
  return {
    templateUrl: 'views/dedication.html',
    restrict: 'E',
    controller: 'DedicationCtrl',
    controllerAs: 'ctrl',
    bindToController: true,
    scope: {
      dedication: '='
    }
  };
};

angular.module('latexmadeeasyApp').directive('dedication', DedicationDirective);
