'use strict';

describe('Controller: StartupPageCtrl', function () {

  // load the controller's module
  beforeEach(module('latexmadeeasyApp'));

  var StartupPageCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    StartupPageCtrl = $controller('StartupPageCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(StartupPageCtrl.awesomeThings.length).toBe(3);
  });
});
