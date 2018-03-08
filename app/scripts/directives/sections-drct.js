'use strict';
/**
 * @ngdoc directive
 * @name latexmadeeasyApp.directive:section
 * @description
 * # section
 */
let SectionsDirective = function() {
  return {
    templateUrl: 'views/sections.html',
    restrict: 'E',
    controller: 'SectionsCtrl',
    controllerAs: 'ctrl',
    bindToController: true,
    scope: {
      section: '='
    },
    link: (scope, element, attr) => {
      attr.$$element[0].children[0].children[1].focus();
    }
  };
};

angular.module('latexmadeeasyApp').directive('sections', SectionsDirective);
