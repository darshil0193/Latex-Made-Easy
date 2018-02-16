'use strict';

/**
 * @ngdoc function
 * @name latexmadeeasyApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the latexmadeeasyApp
 */
angular.module('latexmadeeasyApp')
  .controller('LoginCtrl', function ($scope) {
    $scope.username = '';

    $scope.login = function() {
      console.log($scope.username);
    }
  });
