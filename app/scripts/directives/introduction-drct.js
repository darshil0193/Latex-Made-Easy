'use strict';

/**
 * @ngdoc directive
 * @name latexmadeeasyApp.directive:introduction
 * @description
 * # introduction
 */
let IntroductionDirective = function() {
  return {
    templateUrl: 'views/introduction.html',
    restrict: 'E',
    controller: 'IntroductionCtrl',
    controllerAs: 'ctrl',
    bindToController: true,
    scope: {
      introduction: '=',
    }
  };
};

angular.module('latexmadeeasyApp').directive('introduction', IntroductionDirective);
