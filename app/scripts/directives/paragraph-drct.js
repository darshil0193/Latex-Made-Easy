'use strict';

/**
 * @ngdoc directive
 * @name latexmadeeasyApp.directive:paragraph
 * @description
 * # paragraph
 */
let ParagraphDirective = function() {
  return {
    templateUrl: 'views/paragraph.html',
    restrict: 'E',
    controller: 'ParagraphCtrl',
    controllerAs: 'ctrl',
    bindToController: true,
    scope: {
      paragraph: '='
    },
    link: (scope, element, attr) => {
      attr.$$element[0].children[0].children[1].focus();
    }
  };
};

angular.module('latexmadeeasyApp').directive('paragraph', ParagraphDirective);
