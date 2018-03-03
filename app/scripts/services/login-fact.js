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

  this.sendEmail = (credentials) => {
    return this.$http.post('https://latex-made-easy-backend.herokuapp.com/sendEmail', {
      username: credentials.username
    });
  };

  return {
    registerUser: this.registerUser,
    loginUser: this.loginUser,
    sendEmail: this.sendEmail
  };
};

angular.module('latexmadeeasyApp').factory('LoginFact', LoginFactory);
