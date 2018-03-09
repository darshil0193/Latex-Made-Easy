'use strict';

/**
 * @ngdoc directive
 * @name latexmadeeasyApp.directive:addList
 * @description
 * # addList
 */
let AddListDirective = function() {
  return {
    templateUrl: 'views/add-list.html',
    restrict: 'E',
    controller: 'AddListCtrl',
    controllerAs: 'ctrl',
    bindToController: true,
    scope: {
      list: '='
    },
    link: (scope) => {
      scope.ctrl.items = scope.ctrl.list.items.length;
    }
  };
};

angular.module('latexmadeeasyApp').directive('addList', AddListDirective);
