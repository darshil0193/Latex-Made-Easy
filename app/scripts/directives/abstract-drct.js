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
    },
    link: (scope, element, attr, ctrl) => {
      attr.$$element[0].children[0].children[1].focus();
    }
  };
};

angular.module('latexmadeeasyApp').directive('abstract', AbstractDirective);
