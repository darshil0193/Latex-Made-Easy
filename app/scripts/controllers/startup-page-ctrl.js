'use strict';

/**
 * @ngdoc function
 * @name latexmadeeasyApp.controller:StartupPageCtrl
 * @description
 * # StartupPageCtrl
 * Controller of the latexmadeeasyApp
 */

let StartupPageController = function($http) {
  this.$http = $http;
  this.frontBlockData = {
    title: '',
    acknowledgement: '',
    abstract: ''
  };

  this.getLatex = (frontBlockData) => {
    this.$http.post('http://localhost:3000/checkStatus', frontBlockData).then((data) => {
      console.log(data);
    });
  };
};

angular.module('latexmadeeasyApp').controller('StartupPageCtrl', StartupPageController);
