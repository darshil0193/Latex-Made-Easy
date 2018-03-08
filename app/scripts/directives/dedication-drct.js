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
    },
    link: (scope, element, attr) => {
      attr.$$element[0].children[0].children[1].focus();
    }
  };
};

angular.module('latexmadeeasyApp').directive('dedication', DedicationDirective);
