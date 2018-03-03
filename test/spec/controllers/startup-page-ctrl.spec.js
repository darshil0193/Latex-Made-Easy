'use strict';
describe('Controller: StartupPageCtrl', function() {

  // load the controller's module
  beforeEach(module('latexmadeeasyApp'));

  let StartupPageCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller, $rootScope) {
    scope = $rootScope.$new();
    StartupPageCtrl = $controller('StartupPageCtrl', {
      $scope: scope

      // place here mocked dependencies
    });
  }));

  it('should pass', function() {
    expect(true).toBe(true);
  });
});
