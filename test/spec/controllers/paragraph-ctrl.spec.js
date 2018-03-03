'use strict';

describe('Controller: ParagraphCtrl', function () {

  // load the controller's module
  beforeEach(module('latexmadeeasyApp'));

  var ParagraphCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ParagraphCtrl = $controller('ParagraphCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ParagraphCtrl.awesomeThings.length).toBe(3);
  });
});
