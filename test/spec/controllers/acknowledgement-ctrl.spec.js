'use strict';
describe('Controller: AcknowledgementCtrl', function() {

  // load the controller's module
  beforeEach(module('latexmadeeasyApp'));

  let AcknowledgementCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller, $rootScope) {
    scope = $rootScope.$new();
    AcknowledgementCtrl = $controller('AcknowledgementCtrl', {
      $scope: scope

      // place here mocked dependencies
    });
  }));

  it('should pass', function() {
    expect(true).toBe(true);
  });
});
