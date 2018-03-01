'use strict';

describe('Service: startupPage', function () {

  // load the service's module
  beforeEach(module('latexmadeeasyApp'));

  // instantiate service
  let StartupPageFact;
  beforeEach(inject(function (_StartupPageFact_) {
    StartupPageFact = _StartupPageFact_;
  }));

  it('should do something', function () {
    expect(!!StartupPageFact).toBe(true);
  });

});
