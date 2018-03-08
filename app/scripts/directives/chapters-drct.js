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
      chapter: '='
    },
    link: (scope, element, attr, ctrl) => {
      if (!_.isEmpty(ctrl.chapter.introduction)) {
        ctrl.introductionNumber++;
      }

      _.each(ctrl.chapter.data, (module) => {
        if (module.type === 'section') {
          ctrl.addSection(module);
        } else if (module.type === 'table') {
          ctrl.addTable(module);
        } else if (module.type === 'list') {
          ctrl.addList(module);
        } else if (module.type === 'paragraph') {
          ctrl.addParagraph(module);
        }
      });
    }
  };
};

angular.module('latexmadeeasyApp').directive('chapters', ChaptersDirective);
