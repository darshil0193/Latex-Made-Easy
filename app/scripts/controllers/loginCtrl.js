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
  };

  this.register = (credentials) => {
    if(this.isRegister) {
      this.$http.post('http://localhost:3000/addToDB', {
        username: credentials.username,
        password: credentials.password
      }).then((data) => {
        console.log(data.data);
      }).catch((err) => {
        console.log(err);
      }).finally(() => {
        this.credentials = {
          username: '',
          password: '',
        };
      });
    }

    this.isRegister = true;
  };

  this.login = ((credentials) => {
    this.isRegister = false;
    this.$http.post('http://localhost:3000/checkStatus', {
      username: credentials.username,
      password: credentials.password
    }).then((data) => {
      console.log(data.data);
    }).catch((err) => {
      console.log(err);
    }).finally(() => {
      this.credentials = {
        username: '',
        password: '',
      };
    });
  });
};

angular.module('latexmadeeasyApp').controller('LoginCtrl', LoginController);
