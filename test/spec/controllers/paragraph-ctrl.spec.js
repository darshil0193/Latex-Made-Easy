'use strict';

describe('Controller: ParagraphCtrl', function() {

  // load the controller's module
  beforeEach(module('latexmadeeasyApp'));

  let ParagraphCtrl, $q, $mdDialog, $timeout, $httpBackend;
  let scope = {};
  let element = angular.element('<div></div>');

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller, _$rootScope_, _$mdDialog_, _$q_, _$timeout_, _$httpBackend_) {
    scope = _$rootScope_.$new();
    $q = _$q_;
    $mdDialog = _$mdDialog_;
    $httpBackend = _$httpBackend_;
    $timeout = _$timeout_;
    ParagraphCtrl = $controller('ParagraphCtrl', {
      $scope: scope,
      $element: element

      // place here mocked dependencies
    });
  }));

  beforeEach(() => {
    ParagraphCtrl.paragraph = {
      moduleId: this.moduleNumber,
      id: this.paragraphNumber,
      type: 'paragraph',
      text: '',
      deleted: false
    };
  });

  it('should pop up a dialog when removeParagraph is called', () => {
    spyOn($mdDialog, 'show').and.returnValue($q.when());
    ParagraphCtrl.removeParagraph();
    expect($mdDialog.show).toHaveBeenCalled();
  });

  it('should mark the paragraph as deleted when removeParagraph is called', () => {
    expect(ParagraphCtrl.paragraph.deleted).toBeFalsy();
    spyOn($mdDialog, 'show').and.returnValue($q.when());
    $httpBackend.when('GET', 'views/main.html').respond('');
    ParagraphCtrl.removeParagraph();
    $timeout.flush();
    expect(ParagraphCtrl.paragraph.deleted).toBeTruthy();
  });

  it('should remove the element when removeParagraph is called', () => {
    spyOn($mdDialog, 'show').and.returnValue($q.when());
    spyOn(ParagraphCtrl.$element, 'remove');
    $httpBackend.when('GET', 'views/main.html').respond('');
    ParagraphCtrl.removeParagraph();
    $timeout.flush();
    expect(ParagraphCtrl.$element.remove).toHaveBeenCalled();
  });

  it('should destroy the scope of the element when removeParagraph is called', () => {
    spyOn($mdDialog, 'show').and.returnValue($q.when());
    spyOn(ParagraphCtrl.$scope, '$destroy');
    $httpBackend.when('GET', 'views/main.html').respond('');
    ParagraphCtrl.removeParagraph();
    $timeout.flush();
    expect(ParagraphCtrl.$scope.$destroy).toHaveBeenCalled();
  });
});
