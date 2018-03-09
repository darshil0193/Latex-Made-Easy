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
    link: (scope, element, attr) => {
      scope.ctrl.items = scope.ctrl.list.items.length;
      attr.$$element[0].children[0].children[2].focus();
    }
  };
};

angular.module('latexmadeeasyApp').directive('addList', AddListDirective);
