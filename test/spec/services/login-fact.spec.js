'use strict';
describe('Service: loginFact', function() {

  // load the service's module
  beforeEach(module('latexmadeeasyApp'));

  // instantiate service
  let LoginFact;
  beforeEach(inject(function(_LoginFact_) {
    LoginFact = _LoginFact_;
  }));

  it('should do something', function() {
    expect(!!LoginFact).toBe(true);
  });

});
