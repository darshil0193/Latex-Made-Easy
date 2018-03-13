'use strict';
describe('Controller: LoginCtrl', function() {

  // load the controller's module
  beforeEach(module('latexmadeeasyApp'));

  let LoginCtrl, $rootScope, scope, constants, $httpBackend, $mdDialog, $q;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller, _$rootScope_, _$httpBackend_, _$mdDialog_, _$q_, _constants_) {
    $rootScope = _$rootScope_;
    scope = $rootScope.$new();
    constants = _constants_;
    $httpBackend = _$httpBackend_;
    $mdDialog = _$mdDialog_;
    $q = _$q_;
    LoginCtrl = $controller('LoginCtrl', {
      $scope: scope

      // place here mocked dependencies
    });
  }));

  it('should show login form when showLoginForm is called', function() {
    LoginCtrl.isRegister = true;
    LoginCtrl.failureMessage = 'some message';
    LoginCtrl.showLoginForm();
    expect(LoginCtrl.failureMessage).toEqual('');
    expect(LoginCtrl.isRegister).toBeFalsy();
  });

  it('should show registration form when showRegistrationForm is called', function() {
    LoginCtrl.isRegister = false;
    LoginCtrl.failureMessage = 'some message';
    LoginCtrl.showRegistrationForm();
    expect(LoginCtrl.failureMessage).toEqual('');
    expect(LoginCtrl.isRegister).toBeTruthy();
  });

  it('should show forgot password form when showForgotPasswordForm is called', function() {
    LoginCtrl.isRegister = true;
    LoginCtrl.isForgotPassword = false;
    LoginCtrl.failureMessage = 'some message';
    LoginCtrl.showForgotPasswordForm();
    expect(LoginCtrl.failureMessage).toEqual('');
    expect(LoginCtrl.isRegister).toBeFalsy();
    expect(LoginCtrl.isForgotPassword).toBeTruthy();
  });

  describe('Send Email', () => {

    beforeEach(() => {
      LoginCtrl.credentials = {
        username: 'test',
        password: 'test',
        email: 'test@email.com'
      };
    });

    it('should call the backend email service', () => {
      LoginCtrl.isForgotPassword = true;
      spyOn($mdDialog, 'show').and.returnValue($q.when());
      $httpBackend.when('GET', 'views/main.html').respond('');
      $httpBackend.when('POST', constants.backendUrl + '/sendEmail').respond({data: {email: LoginCtrl.credentials.email}});
      LoginCtrl.sendEmail(LoginCtrl.credentials);
      $httpBackend.flush();
      expect($mdDialog.show).toHaveBeenCalled();
      expect(LoginCtrl.isForgotPassword).toBeFalsy();
    });

    it('should show the backend errors if email sending fails', () => {
      LoginCtrl.isForgotPassword = true;
      spyOn($mdDialog, 'show').and.returnValue($q.when());
      $httpBackend.when('GET', 'views/main.html').respond('');
      $httpBackend.when('POST', constants.backendUrl + '/sendEmail').respond(400, {error: 'EMAIL_NOT_SENT', email: LoginCtrl.credentials.email});
      LoginCtrl.sendEmail(LoginCtrl.credentials);
      $httpBackend.flush();
      expect($mdDialog.show).toHaveBeenCalled();
      expect(LoginCtrl.isForgotPassword).toBeFalsy();
      expect(LoginCtrl.failureTitle).toEqual('Sorry!');
      expect(LoginCtrl.failureMessage).toEqual('There seems to be some trouble with sending the email to ' + LoginCtrl.credentials.email + '. We are working on it.');
    });

    it('should show the backend errors if username is incorrect', () => {
      LoginCtrl.isForgotPassword = true;
      spyOn($mdDialog, 'show').and.returnValue($q.when());
      $httpBackend.when('GET', 'views/main.html').respond('');
      $httpBackend.when('POST', constants.backendUrl + '/sendEmail').respond(400, {error: 'USER_INCORRECT'});
      LoginCtrl.sendEmail(LoginCtrl.credentials);
      $httpBackend.flush();
      expect($mdDialog.show).toHaveBeenCalled();
      expect(LoginCtrl.isForgotPassword).toBeFalsy();
      expect(LoginCtrl.failureTitle).toEqual('Username Error');
      expect(LoginCtrl.failureMessage).toEqual('Incorrect Username Entered. Such a user does not exist');
    });
  });

  describe('Login', () => {

    beforeEach(() => {
      LoginCtrl.credentials = {
        username: 'test',
        password: 'test',
        email: 'test@email.com'
      };
    });

    it('should call the backend login service', () => {
      let frontBlockDataResponse = {
        title: {
          title: '',
          author: '',
          college: '',
          degree: '',
          date: new Date()
        },
        dedication: {
          dedication: ''
        },
        acknowledge: {
          acknowledge:''
        },
        abstract: {
          abstract: ''
        },
        chapters: {
          chapters: []
        }
      };
      LoginCtrl.successfulLogin = false;

      $httpBackend.when('GET', 'views/main.html').respond('');
      $httpBackend.when('POST', constants.backendUrl + '/loginUser').respond({latexJson: frontBlockDataResponse});
      LoginCtrl.login(LoginCtrl.credentials);
      $httpBackend.flush();
      expect(LoginCtrl.successfulLogin).toBeTruthy();
      expect($rootScope.currentUser).toEqual('test');
      expect(LoginCtrl.frontBlockData).toEqual(frontBlockDataResponse);
    });

    it('should show the backend error when password is incorrect', () => {
      spyOn($mdDialog, 'show').and.returnValue($q.when());
      $httpBackend.when('GET', 'views/main.html').respond('');
      $httpBackend.when('POST', constants.backendUrl + '/loginUser').respond(400, {error: 'PASS_INCORRECT'});
      LoginCtrl.login(LoginCtrl.credentials);
      $httpBackend.flush();
      expect($mdDialog.show).toHaveBeenCalled();
      expect(LoginCtrl.failureTitle).toEqual('Password Error');
      expect(LoginCtrl.failureMessage).toEqual('Incorrect Password Entered');
    });

    it('should show the backend error when username is incorrect', () => {
      spyOn($mdDialog, 'show').and.returnValue($q.when());
      $httpBackend.when('GET', 'views/main.html').respond('');
      $httpBackend.when('POST', constants.backendUrl + '/loginUser').respond(400, {error: 'USER_INCORRECT'});
      LoginCtrl.login(LoginCtrl.credentials);
      $httpBackend.flush();
      expect($mdDialog.show).toHaveBeenCalled();
      expect(LoginCtrl.failureTitle).toEqual('Username Error');
      expect(LoginCtrl.failureMessage).toEqual('Incorrect Username Entered. Such a user does not exist');
    });
  });

  describe('Register', () => {

    beforeEach(() => {
      LoginCtrl.credentials = {
        username: 'test',
        password: 'test',
        email: 'test@email.com'
      };
    });

    it('should call backend service for registering', () => {
      $httpBackend.when('GET', 'views/main.html').respond('');
      $httpBackend.when('POST', constants.backendUrl + '/registerUser').respond();
      LoginCtrl.register(LoginCtrl.credentials);
      $httpBackend.flush();
      expect(LoginCtrl.successfulLogin).toBeTruthy();
      expect($rootScope.currentUser).toEqual('test');
    });

    it('should throw error if username is already taken', () => {
      spyOn($mdDialog, 'show').and.returnValue($q.when());
      $httpBackend.when('GET', 'views/main.html').respond('');
      $httpBackend.when('POST', constants.backendUrl + '/registerUser').respond(409, {error: 'UNAME_TAKEN'});
      LoginCtrl.register(LoginCtrl.credentials);
      $httpBackend.flush();
      expect($mdDialog.show).toHaveBeenCalled();
      expect(LoginCtrl.failureTitle).toEqual('Username Error');
      expect(LoginCtrl.failureMessage).toEqual('Username already taken. Please try something else');
    });

    it('should throw error if username is already taken', () => {
      spyOn($mdDialog, 'show').and.returnValue($q.when());
      $httpBackend.when('GET', 'views/main.html').respond('');
      $httpBackend.when('POST', constants.backendUrl + '/registerUser').respond(409, {error: 'EMAIL_USED'});
      LoginCtrl.register(LoginCtrl.credentials);
      $httpBackend.flush();
      expect($mdDialog.show).toHaveBeenCalled();
      expect(LoginCtrl.failureTitle).toEqual('Email Error');
      expect(LoginCtrl.failureMessage).toEqual('Email ID already used. Please Login or try with a different email id');
    });

    it('should throw error if password length is less than 8 characters', () => {
      spyOn($mdDialog, 'show').and.returnValue($q.when());
      $httpBackend.when('GET', 'views/main.html').respond('');
      $httpBackend.when('POST', constants.backendUrl + '/registerUser').respond(400, {error: 'PASS_LENGTH'});
      LoginCtrl.register(LoginCtrl.credentials);
      $httpBackend.flush();
      expect($mdDialog.show).toHaveBeenCalled();
      expect(LoginCtrl.failureTitle).toEqual('Password Error');
      expect(LoginCtrl.failureMessage).toEqual('Password should be at least 8 characters in length');
    });

    it('should throw error if password contains spaces', () => {
      spyOn($mdDialog, 'show').and.returnValue($q.when());
      $httpBackend.when('GET', 'views/main.html').respond('');
      $httpBackend.when('POST', constants.backendUrl + '/registerUser').respond(400, {error: 'PASS_SPACE'});
      LoginCtrl.register(LoginCtrl.credentials);
      $httpBackend.flush();
      expect($mdDialog.show).toHaveBeenCalled();
      expect(LoginCtrl.failureTitle).toEqual('Password Error');
      expect(LoginCtrl.failureMessage).toEqual('Password can not contain spaces');
    });

    it('should throw error if password contains some special characters', () => {
      spyOn($mdDialog, 'show').and.returnValue($q.when());
      $httpBackend.when('GET', 'views/main.html').respond('');
      $httpBackend.when('POST', constants.backendUrl + '/registerUser').respond(400, {error: 'PASS_CHARS'});
      LoginCtrl.register(LoginCtrl.credentials);
      $httpBackend.flush();
      expect($mdDialog.show).toHaveBeenCalled();
      expect(LoginCtrl.failureTitle).toEqual('Password Error');
      expect(LoginCtrl.failureMessage).toEqual('Password cannot contain any of //, /* or */ patterns');
    });
  });
});
