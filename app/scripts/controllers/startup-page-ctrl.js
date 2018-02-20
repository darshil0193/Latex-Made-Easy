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
    title: {
      title: '',
      author: '',
      college: '',
      degree: '',
      date: '',
    },
    acknowledge: {
      acknowledge:''
    },
    abstract: {
      abstract: ''
    }
  };

  this.getLatex = (frontBlockData) => {
    this.$http.post('http://localhost:3000/getLatex', frontBlockData).then((data) => {
      console.log(data);
    });
  };
};

angular.module('latexmadeeasyApp').controller('StartupPageCtrl', StartupPageController);
