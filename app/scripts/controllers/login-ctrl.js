'use strict';

/**
 * @ngdoc function
 * @name latexmadeeasyApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the latexmadeeasyApp
 */
let LoginController = function($http) {
  this.$http = $http;
  this.isRegister = false;
  this.credentials = {
    username: '',
    password: '',
    email:'',
  };

  this.register = (credentials) => {
    if(!_.isEmpty(credentials.username) && !_.isEmpty(credentials.password) && !_.isEmpty(credentials.email)) {
      this.$http.post('http://localhost:3000/registerUser', {
        username: credentials.username,
        password: credentials.password,
        email: credentials.email,
      }).then(() => {
        this.successfulLogin = true;
      }).catch((err) => {
        console.log(err);
      }).finally(() => {
        this.credentials = {
          username: '',
          password: '',
          email: '',
        };
      });
    }
  };

  this.login = ((credentials) => {
    if(!_.isEmpty(credentials.username) && !_.isEmpty(credentials.password)) {
      this.$http.post('http://localhost:3000/logInUser', {
        username: credentials.username,
        password: credentials.password
      }).then((data) => {
        this.successfulLogin = true;
      }).catch((err) => {
        console.log(err);
      }).finally(() => {
        this.credentials = {
          username: '',
          password: '',
          email: '',
        };
      });
    }
  });

  this.showLoginForm = () => {
    this.isRegister = false;
  };

  this.showRegistrationForm = () => {
    this.isRegister = true;
  }
};

angular.module('latexmadeeasyApp').controller('LoginCtrl', LoginController);
