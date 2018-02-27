'use strict';

/**
 * @ngdoc directive
 * @name latexmadeeasyApp.directive:chapters
 * @description
 * # chapters
 */
let ChaptersDirective = function() {
  return {
    templateUrl: 'views/chapters.html',
    restrict: 'E',
    controller: 'ChaptersCtrl',
    controllerAs: 'ctrl',
    bindToController: true,
    scope: {
      chapter: '=',
    },
    link: (scope) => {
      console.log('added chapter');
    }
  };
};

angular.module('latexmadeeasyApp').directive('chapters', ChaptersDirective);
