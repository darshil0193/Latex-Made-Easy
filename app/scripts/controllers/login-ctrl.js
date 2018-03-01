'use strict';

/**
 * @ngdoc function
 * @name latexmadeeasyApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the latexmadeeasyApp
 */
let LoginController = function($mdDialog, $rootScope, LoginFact) {
  this.$rootScope = $rootScope;
  this.$mdDialog = $mdDialog;
  this.isRegister = false;
  this.isForgotPassword = false;
  this.failureMessage = '';
  this.failureTitle = '';
  this.LoginFact = LoginFact;
  this.credentials = {
    username: '',
    password: '',
    email:'',
  };

  this.updateErrors = (err) => {
    if(err.data.error === 'PASS_LENGTH') {
      this.failureTitle = 'Password Error';
      this.failureMessage = 'Password should be at least 8 characters in length';
      this.credentials.password = '';
    } else if(err.data.error === 'PASS_SPACE') {
      this.failureTitle = 'Password Error';
      this.failureMessage = 'Password can not contain spaces';
      this.credentials.password = '';
    } else if(err.data.error === 'PASS_CHARS') {
      this.failureTitle = 'Password Error';
      this.failureMessage = 'Password cannot contain any of //, /* or */ patterns';
      this.credentials.password = '';
    } else if(err.data.error === 'UNAME_TAKEN') {
      this.failureTitle = 'Username Error';
      this.failureMessage = 'Username already taken. Please try something else';
      this.credentials.username = '';
    } else if(err.data.error === 'EMAIL_USED') {
      this.failureTitle = 'Email Error';
      this.failureMessage = 'Email ID already used. Please Login or try with a different email id';
      this.credentials.email = '';
    } else if(err.data.error === 'PASS_INCORRECT') {
      this.failureTitle = 'Password Error';
      this.failureMessage = 'Incorrect Password Entered';
      this.credentials.password = '';
    } else if(err.data.error === 'USER_INCORRECT') {
      this.failureTitle = 'Username Error';
      this.failureMessage = 'Incorrect Username Entered. Such a user does not exist';
      this.credentials.password = '';
      this.credentials.username = '';
    } else if(err.data.error === 'EMAIL_NOT_SENT') {
      this.failureTitle = 'Sorry!';
      this.failureMessage = 'There seems to be some trouble with sending the email';
      if(!_.isEmpty(err.data.email)) {
        this.failureMessage += ' to ' + err.data.email;
      }
      this.failureMessage += '. We are working on it.';
    }
  };

  this.register = (credentials) => {
    if(!_.isEmpty(credentials.username) && !_.isEmpty(credentials.password) && !_.isEmpty(credentials.email)) {
      this.LoginFact.registerUser(credentials).then(() => {
        this.successfulLogin = true;
        this.$rootScope.currentUser = this.credentials.username;
        this.credentials = {
          username: '',
          password: '',
          email: '',
        };
      }).catch((err) => {
        this.updateErrors(err);
        this.$mdDialog.show(
          this.$mdDialog.alert()
            .parent(angular.element(document.querySelector('#popupContainer')))
            .clickOutsideToClose(true)
            .title(this.failureTitle)
            .textContent(this.failureMessage)
            .ok('Got it!')
        );
      });
    }
  };

  this.login = ((credentials) => {
    if(!_.isEmpty(credentials.username) && !_.isEmpty(credentials.password)) {
      this.LoginFact.loginUser(credentials).then(() => {
        this.successfulLogin = true;
        this.$rootScope.currentUser = this.credentials.username;
        this.credentials = {
          username: '',
          password: '',
          email: '',
        };
      }).catch((err) => {
        this.updateErrors(err);

        this.$mdDialog.show(
          this.$mdDialog.alert()
            .parent(angular.element(document.querySelector('#popupContainer')))
            .clickOutsideToClose(true)
            .title(this.failureTitle)
            .textContent(this.failureMessage)
            .ok('Got it!')
        );

      });
    }
  });

  this.showLoginForm = () => {
    this.failureMessage = '';
    this.isRegister = false;
  };

  this.showRegistrationForm = () => {
    this.failureMessage = '';
    this.isRegister = true;
  };

  this.showForgotPasswordForm = () => {
    this.failureMessage = '';
    this.isRegister = false;
    this.isForgotPassword = true;
  };

  this.sendEmail = (credentials) => {
    if(!_.isEmpty(credentials.username)) {
      this.LoginFact.sendEmail(credentials).then((data) => {
        this.$mdDialog.show(
          this.$mdDialog.alert()
            .parent(angular.element(document.querySelector('#popupContainer')))
            .clickOutsideToClose(true)
            .title('Mail Sent')
            .htmlContent('An email containing password has been sent to: <b>' + data.data.email + '</b>')
            .ok('Got it!')
        );

      }).catch((err) => {
        this.updateErrors(err);
        this.$mdDialog.show(
          this.$mdDialog.alert()
            .parent(angular.element(document.querySelector('#popupContainer')))
            .clickOutsideToClose(true)
            .title(this.failureTitle)
            .textContent(this.failureMessage)
            .ok('Got it!')
        );
      }).finally(() => {
        this.isForgotPassword = false;
      });
    }
  };
};

angular.module('latexmadeeasyApp').controller('LoginCtrl', LoginController);
