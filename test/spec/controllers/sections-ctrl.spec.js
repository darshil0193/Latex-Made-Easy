'use strict';
describe('Controller: SectionCtrl', function() {

  // load the controller's module
  beforeEach(module('latexmadeeasyApp'));

  let SectionsCtrl;
  let scope = {};
  let element = angular.element('<div></div>');

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller, $rootScope) {
    scope = $rootScope.$new();
    SectionsCtrl = $controller('SectionsCtrl', {
      $scope: scope,
      $element: element

      // place here mocked dependencies
    });
  }));

  it('should pass', function() {
    expect(true).toBe(true);
  });
});
