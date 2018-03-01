'use strict';

describe('Controller: DedicationCtrl', function () {

  // load the controller's module
  beforeEach(module('latexmadeeasyApp'));

  var DedicationCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DedicationCtrl = $controller('DedicationCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should pass', function () {
    expect(true).toBe(true);
  });
});
