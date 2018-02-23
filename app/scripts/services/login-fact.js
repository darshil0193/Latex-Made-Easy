'use strict';

/**
 * @ngdoc service
 * @name latexmadeeasyApp.loginFact
 * @description
 * # loginFact
 * Factory in the latexmadeeasyApp.
 */
let LoginFactory = function($http) {
  this.$http = $http;

  this.registerUser = (credentials) => {
    return this.$http.post('https://latex-made-easy-backend.herokuapp.com/registerUser', {
      username: credentials.username,
      password: credentials.password,
      email: credentials.email,
    });
  };

  this.loginUser = (credentials) => {
    return this.$http.post('https://latex-made-easy-backend.herokuapp.com/loginUser', {
      username: credentials.username,
      password: credentials.password,
      email: credentials.email,
    });
  };

  return {
    registerUser: this.registerUser,
    loginUser: this.loginUser
  }
};

angular.module('latexmadeeasyApp').factory('LoginFact', LoginFactory);
