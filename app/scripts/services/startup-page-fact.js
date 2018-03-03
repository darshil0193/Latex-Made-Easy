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
      responseType: 'blob',
    });
  };

  return {
    getLatex: this.getLatex,
  };
};

angular.module('latexmadeeasyApp').factory('StartupPageFact', StartupPageFactory);
