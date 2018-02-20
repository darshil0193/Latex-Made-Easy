'use strict';

describe('Service: startupPage', function () {

  // load the service's module
  beforeEach(module('latexmadeeasyApp'));

  // instantiate service
  var startupPage;
  beforeEach(inject(function (_startupPage_) {
    startupPage = _startupPage_;
  }));

  it('should do something', function () {
    expect(!!startupPage).toBe(true);
  });

});
