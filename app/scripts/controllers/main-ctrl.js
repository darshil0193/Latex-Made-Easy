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
    successfulLogin: false,
    latexJson: {
      title: {
        title: '',
        author: '',
        college: '',
        degree: '',
        date: new Date()
      },
      dedication: {
        dedication: ''
      },
      acknowledge: {
        acknowledge:''
      },
      abstract: {
        abstract: ''
      },
      chapters: {
        chapters: []
      }
    }
  };
};

angular.module('latexmadeeasyApp').controller('MainCtrl', MainController);
