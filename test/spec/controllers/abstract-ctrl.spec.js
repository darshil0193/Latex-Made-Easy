'use strict';
describe('Controller: AbstractCtrl', function() {

  // load the controller's module
  beforeEach(module('latexmadeeasyApp'));

  let AbstractCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller, $rootScope) {
    scope = $rootScope.$new();
    AbstractCtrl = $controller('AbstractCtrl', {
      $scope: scope

      // place here mocked dependencies
    });
  }));

  it('should be empty', function() {
    expect(AbstractCtrl).toBeDefined();
  });
});
