'use strict';
/**
 * @ngdoc service
 * @name latexmadeeasyApp.startupPage
 * @description
 * # startupPage
 * Factory in the latexmadeeasyApp.
 */
let StartupPageFactory = function($http, constants) {
  this.$http = $http;
  this.constants = constants;

  this.getLatex = (reqObject) => {
    return this.$http({
      url: this.constants.backendUrl + '/getLatex',
      method: 'POST',
      data: reqObject,
      responseType: 'blob'
    });
  };

  this.saveLatex = (reqObject) => {
    return this.$http({
      url: this.constants.backendUrl + '/saveLatex',
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
