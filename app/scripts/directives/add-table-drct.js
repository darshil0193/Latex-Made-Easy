'use strict';
/**
 * @ngdoc directive
 * @name latexmadeeasyApp.directive:addTable
 * @description
 * # addTable
 */
let AddTableDirective = function() {
  return {
    templateUrl: 'views/add-table.html',
    restrict: 'E',
    controller: 'AddTableCtrl',
    controllerAs: 'ctrl',
    bindToController: true,
    scope: {
      table: '='
    }
  };
};

angular.module('latexmadeeasyApp').directive('addTable', AddTableDirective);
