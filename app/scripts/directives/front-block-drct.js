'use strict';
/**
 * @ngdoc directive
 * @name latexmadeeasyApp.directive:frontBlock
 * @description
 * # frontBlock
 */
let FrontBlockDirective = function() {
  return {
    templateUrl: 'views/front-block.html',
    restrict: 'E',
    controller: 'FrontBlockCtrl',
    controllerAs: 'ctrl',
    bindToController: true,
    scope: {
      title: '='
    },
    link: (scope, element, attr) => {
      attr.$$element[0].children[0].children[1].focus();
    }
  };
};

angular.module('latexmadeeasyApp').directive('frontBlock', FrontBlockDirective);
