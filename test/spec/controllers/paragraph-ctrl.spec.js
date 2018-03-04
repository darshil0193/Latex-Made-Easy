'use strict';

describe('Controller: ParagraphCtrl', function() {

  // load the controller's module
  beforeEach(module('latexmadeeasyApp'));

  let ParagraphCtrl;
  let scope = {};
  let element = angular.element('<div></div>');

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller, $rootScope) {
    scope = $rootScope.$new();
    ParagraphCtrl = $controller('ParagraphCtrl', {
      $scope: scope,
      $element: element

      // place here mocked dependencies
    });
  }));

  it('should pass', function() {
    expect(true).toBe(true);
  });
});
