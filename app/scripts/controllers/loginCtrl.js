'use strict';

/**
 * @ngdoc function
 * @name latexmadeeasyApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the latexmadeeasyApp
 */
angular.module('latexmadeeasyApp')
  .controller('LoginCtrl', function ($scope, $http) {
    $scope.credentials = {
      username: '',
      password: '',
    };

    $scope.register = function(credentials) {
      $http.post('http://localhost:3000/addToDB', {
        username: credentials.username,
        password: credentials.password
      }).then(function(data) {
        console.log(data.data);
      }).catch(function(err) {
        console.log(err);
      }).finally(function() {
        $scope.credentials = {
          username: '',
          password: '',
        };
      });
    };

    $scope.login = (function(credentials) {
      $http.post('http://localhost:3000/checkStatus', {
        username: credentials.username,
        password: credentials.password
      }).then(function(data) {
        console.log(data.data);
      }).catch(function(err) {
        console.log(err);
      }).finally(function() {
        $scope.credentials = {
          username: '',
          password: '',
        };
      });
    });
  });
