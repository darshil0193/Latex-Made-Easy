'use strict';

describe('Directive: startupPage', function () {

  // load the directive's module
  beforeEach(module('latexmadeeasyApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<startup-page></startup-page>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the startupPage directive');
  }));
});
