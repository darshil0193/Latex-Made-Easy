'use strict';

describe('Controller: AddtableCtrl', function () {

  // load the controller's module
  beforeEach(module('latexmadeeasyApp'));

  var AddTableCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AddTableCtrl = $controller('AddTableCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should pass', function () {
    expect(true).toBe(true);
  });
});
