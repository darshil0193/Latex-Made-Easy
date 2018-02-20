'use strict';

describe('Service: loginFact', function () {

  // load the service's module
  beforeEach(module('latexmadeeasyApp'));

  // instantiate service
  var loginFact;
  beforeEach(inject(function (_loginFact_) {
    loginFact = _loginFact_;
  }));

  it('should do something', function () {
    expect(!!loginFact).toBe(true);
  });

});
