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
      chapters: '=',
    }
  };
};

angular.module('latexmadeeasyApp').directive('chapters', ChaptersDirective);
