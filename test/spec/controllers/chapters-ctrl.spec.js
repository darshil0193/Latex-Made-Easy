'use strict';

describe('Controller: ChaptersCtrl', function () {

  // load the controller's module
  beforeEach(module('latexmadeeasyApp'));

  var ChaptersCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ChaptersCtrl = $controller('ChaptersCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should pass', function () {
    expect(true).toBe(true);
  });
});
