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
      date: new Date(),
    },
    acknowledge: {
      acknowledge:''
    },
    abstract: {
      abstract: ''
    }
  };
  this.pageNumber = 1;

  this.getLatex = (frontBlockData) => {
    let requestObject = _.cloneDeep(frontBlockData);
    requestObject.title.date = frontBlockData.title.date.toDateString().substring(4);
    this.$http.post('http://localhost:3000/getLatex', requestObject).then((data) => {
      console.log(data);
    });
  };
};

angular.module('latexmadeeasyApp').controller('StartupPageCtrl', StartupPageController);
