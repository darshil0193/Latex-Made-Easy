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
    }
  };
};

angular.module('latexmadeeasyApp').directive('frontBlock', FrontBlockDirective);
