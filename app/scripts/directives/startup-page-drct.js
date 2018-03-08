'use strict';
/**
 * @ngdoc directive
 * @name latexmadeeasyApp.directive:startupPage
 * @description
 * # startupPage
 */

let StartupPageDirective = function() {
  return {
    templateUrl: 'views/startup-page.html',
    restrict: 'E',
    controller: 'StartupPageCtrl',
    controllerAs: 'ctrl',
    bindToController: true,
    scope: {
      frontBlockData: '='
    },
    link: (scope, element, attr, ctrl) => {

      //Update the total number of chapters if chapters exist.
      ctrl.chapterNumber = !_.isUndefined(ctrl.frontBlockData) && !_.isUndefined(ctrl.frontBlockData.chapters) &&
        !_.isUndefined(ctrl.frontBlockData.chapters.chapters) && _.isArray(ctrl.frontBlockData.chapters.chapters) ?
        ctrl.frontBlockData.chapters.chapters.length : 0;
    }
  };
};

angular.module('latexmadeeasyApp').directive('startupPage', StartupPageDirective);
