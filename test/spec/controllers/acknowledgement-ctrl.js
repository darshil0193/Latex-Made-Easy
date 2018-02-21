'use strict';

describe('Controller: AcknowledgementCtrl', function () {

  // load the controller's module
  beforeEach(module('latexmadeeasyApp'));

  var AcknowledgementCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AcknowledgementCtrl = $controller('AcknowledgementCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(AcknowledgementCtrl.awesomeThings.length).toBe(3);
  });
});
