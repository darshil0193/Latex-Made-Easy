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
      chapter: '=',
      introductionNumber: '='
    },
    link: (scope, element, attr) => {
      attr.$$element[0].children[0].children[5].focus();
    }
  };
};

angular.module('latexmadeeasyApp').directive('introduction', IntroductionDirective);
