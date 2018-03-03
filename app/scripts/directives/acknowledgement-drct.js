'use strict';
/**
 * @ngdoc directive
 * @name latexmadeeasyApp.directive:acknowledgement
 * @description
 * # acknowledgement
 */
let AcknowledgementDirective = function() {
  return {
    templateUrl: 'views/acknowledgement.html',
    restrict: 'E',
    controller: 'AcknowledgementCtrl',
    controllerAs: 'ctrl',
    bindToController: true,
    scope: {
      acknowledge: '='
    }
  };
};

angular.module('latexmadeeasyApp').directive('acknowledgement', AcknowledgementDirective);
