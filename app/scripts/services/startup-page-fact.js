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
    return this.$http({
      url: 'https://latex-made-easy-backend.herokuapp.com/getLatex',
      method: 'POST',
      data: reqObject,
      responseType: 'blob'
    });
  };

  this.saveLatex = (reqObject) => {
    return this.$http({
      url: 'https://latex-made-easy-backend.herokuapp.com/saveLatex',
      method: 'POST',
      data: reqObject
    });
  };

  return {
    getLatex: this.getLatex,
    saveLatex: this.saveLatex
  };
};

angular.module('latexmadeeasyApp').factory('StartupPageFact', StartupPageFactory);
