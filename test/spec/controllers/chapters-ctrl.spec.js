'use strict';

describe('Controller: ChaptersCtrl', function () {

  // load the controller's module
  beforeEach(module('latexmadeeasyApp'));

  let ChaptersCtrl, scope = {}, element = angular.element('<div></div>');

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ChaptersCtrl = $controller('ChaptersCtrl', {
      $scope: scope,
      $element: element
      // place here mocked dependencies
    });
  }));

  it('should pass', function () {
    expect(true).toBe(true);
  });
});
