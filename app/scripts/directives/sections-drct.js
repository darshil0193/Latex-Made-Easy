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
      section: '=',
    }
  };
};

angular.module('latexmadeeasyApp').directive('sections', SectionsDirective);
