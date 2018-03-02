'use strict';

describe('Controller: IntroductionCtrl', function () {

  // load the controller's module
  beforeEach(module('latexmadeeasyApp'));

  var IntroductionCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    IntroductionCtrl = $controller('IntroductionCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should pass', function () {
    expect(true).toBe(true);
  });
});
