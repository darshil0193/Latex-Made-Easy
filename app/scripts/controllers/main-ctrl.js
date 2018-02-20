'use strict';

/**
 * @ngdoc function
 * @name latexmadeeasyApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the latexmadeeasyApp
 */
let MainController = function($scope) {
  $scope.loginBinder = {
    successfulLogin: false
  };
};

angular.module('latexmadeeasyApp').controller('MainCtrl', MainController);
