'use strict';

describe('Controller: SectionCtrl', function () {

  // load the controller's module
  beforeEach(module('latexmadeeasyApp'));

  var SectionsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SectionsCtrl = $controller('SectionsCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should pass', function () {
    expect(true).toBe(true);
  });
});
