'use strict';

/**
 * @ngdoc directive
 * @name latexmadeeasyApp.directive:acknowledgement
 * @description
 * # acknowledgement
 */
let AcknowledgementAbstractDirective = function() {
  return {
    templateUrl: 'views/acknowledgement-abstract.html',
    restrict: 'E',
    controller: 'AcknowledgementAbstractCtrl',
    controllerAs: 'ctrl',
    bindToController: true,
    scope: {
      acknowledge: '=',
      abstract: '=',
    }
  };
};

angular.module('latexmadeeasyApp').directive('acknowledgementAbstract', AcknowledgementAbstractDirective);
