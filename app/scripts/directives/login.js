'use strict';

/**
 * @ngdoc directive
 * @name latexmadeeasyApp.directive:login
 * @description
 * # login
 */
angular.module('latexmadeeasyApp')
  .directive('login', function () {
    return {
      templateUrl: 'views/login.html',
      restrict: 'E',
      controller: 'LoginCtrl',
      link: function postLink(scope, element, attrs) {
        element.text('this is the login directive');
      },
    };
  });
