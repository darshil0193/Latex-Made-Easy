'use strict';

describe('Directive: abstract', function () {

  // load the directive's module
  beforeEach(module('latexmadeeasyApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<abstract></abstract>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the abstract directive');
  }));
});
