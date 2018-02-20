'use strict';

/**
 * @ngdoc service
 * @name latexmadeeasyApp.startupPage
 * @description
 * # startupPage
 * Factory in the latexmadeeasyApp.
 */
let StartupPageFactory = function($http) {
  this.$http = $http;

  this.getLatex = (reqObject) => {
    return this.$http.post('http://localhost:3000/getLatex', reqObject);
  };

  return {
    getLatex: this.getLatex,
  }
};

angular.module('latexmadeeasyApp').factory('StartupPageFact', StartupPageFactory);
