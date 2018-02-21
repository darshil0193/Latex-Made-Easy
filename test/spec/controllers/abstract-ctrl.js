'use strict';

describe('Controller: AbstractCtrl', function () {

  // load the controller's module
  beforeEach(module('latexmadeeasyApp'));

  var AbstractCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AbstractCtrl = $controller('AbstractCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(AbstractCtrl.awesomeThings.length).toBe(3);
  });
});
