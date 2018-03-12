'use strict';

describe('Controller: AddListCtrl', function() {

  // load the controller's module
  beforeEach(module('latexmadeeasyApp'));

  let AddListCtrl;
  let scope = {};
  let element = angular.element('<div></div>');

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller, $rootScope) {
    scope = $rootScope.$new();
    AddListCtrl = $controller('AddListCtrl', {
      $scope: scope,
      $element: element

      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function() {
    expect(true).toBe(true);
  });
});
