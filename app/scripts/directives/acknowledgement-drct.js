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
    },
    link: (scope, element, attr, ctrl) => {
      attr.$$element[0].children[0].children[1].focus();
    }
  };
};

angular.module('latexmadeeasyApp').directive('acknowledgement', AcknowledgementDirective);
