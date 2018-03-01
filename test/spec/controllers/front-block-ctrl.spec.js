'use strict';

describe('Controller: FrontBlockCtrl', function () {

  // load the controller's module
  beforeEach(module('latexmadeeasyApp'));

  var FrontBlockCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FrontBlockCtrl = $controller('FrontBlockCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should pass', function () {
    expect(true).toBe(true);
  });
});
