'use strict';
describe('Controller: IntroductionCtrl', function() {

  // load the controller's module
  beforeEach(module('latexmadeeasyApp'));

  let IntroductionCtrl, scope, $mdDialog, $q, $timeout, $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller, _$rootScope_, _$mdDialog_, _$q_, _$timeout_, _$httpBackend_) {
    scope = _$rootScope_.$new();
    $mdDialog = _$mdDialog_;
    $q = _$q_;
    $timeout = _$timeout_;
    $httpBackend = _$httpBackend_;
    IntroductionCtrl = $controller('IntroductionCtrl', {
      $scope: scope

      // place here mocked dependencies
    });
  }));

  beforeEach(() => {
    IntroductionCtrl.introductionNumber = 1;
    IntroductionCtrl.chapter = {
      id: this.chapterNumber,
      name: 'Test Chapter',
      introduction: 'Test Introduction',
      deleted: false,
      data: []
    };
  });

  it('should pop up a dialog when removeIntroduction is called', () => {
    spyOn($mdDialog, 'show').and.returnValue($q.when());
    IntroductionCtrl.removeIntroduction();
    expect($mdDialog.show).toHaveBeenCalled();
  });

  it('should empty the introduction when removeIntroduction is called', () => {
    spyOn($mdDialog, 'show').and.returnValue($q.when());
    IntroductionCtrl.removeIntroduction();
    $httpBackend.when('GET', 'views/main.html').respond('');
    $timeout.flush();
    expect(IntroductionCtrl.introductionNumber).toEqual(0);
    expect(IntroductionCtrl.chapter.introduction).toEqual('');
  });
});
