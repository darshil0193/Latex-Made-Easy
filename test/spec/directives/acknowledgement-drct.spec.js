'use strict';
describe('Directive: acknowledgement', function() {

  // load the directive's module
  beforeEach(module('latexmadeeasyApp'));

  let element, scope;

  beforeEach(inject(function($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function($compile) {
    element = angular.element('<acknowledgement></acknowledgement>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('');
  }));
});
