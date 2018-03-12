'use strict';
describe('Controller: SectionCtrl', function() {

  // load the controller's module
  beforeEach(module('latexmadeeasyApp'));

  let SectionsCtrl, $q, $mdDialog, $timeout, $httpBackend;
  let scope = {};
  let element = angular.element('<div></div>');

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller, _$rootScope_, _$mdDialog_, _$q_, _$timeout_, _$httpBackend_) {
    scope = _$rootScope_.$new();
    $q = _$q_;
    $mdDialog = _$mdDialog_;
    $httpBackend = _$httpBackend_;
    $timeout = _$timeout_;
    SectionsCtrl = $controller('SectionsCtrl', {
      $scope: scope,
      $element: element

      // place here mocked dependencies
    });
  }));

  beforeEach(() => {
    SectionsCtrl.section = {
      moduleId: this.moduleNumber,
      id: this.sectionNumber,
      name: 'Test Section',
      type: 'section',
      text: '',
      deleted: false
    };
  });

  it('should pop up a dialog when removeSection is called', () => {
    spyOn($mdDialog, 'show').and.returnValue($q.when());
    SectionsCtrl.removeSection();
    expect($mdDialog.show).toHaveBeenCalled();
  });

  it('should mark the section as deleted when removeSection is called', () => {
    expect(SectionsCtrl.section.deleted).toBeFalsy();
    spyOn($mdDialog, 'show').and.returnValue($q.when());
    $httpBackend.when('GET', 'views/main.html').respond('');
    SectionsCtrl.removeSection();
    $timeout.flush();
    expect(SectionsCtrl.section.deleted).toBeTruthy();
  });

  it('should remove the element when removeSection is called', () => {
    spyOn($mdDialog, 'show').and.returnValue($q.when());
    spyOn(SectionsCtrl.$element, 'remove');
    $httpBackend.when('GET', 'views/main.html').respond('');
    SectionsCtrl.removeSection();
    $timeout.flush();
    expect(SectionsCtrl.$element.remove).toHaveBeenCalled();
  });

  it('should destroy the scope of the element when removeSection is called', () => {
    spyOn($mdDialog, 'show').and.returnValue($q.when());
    spyOn(SectionsCtrl.$scope, '$destroy');
    $httpBackend.when('GET', 'views/main.html').respond('');
    SectionsCtrl.removeSection();
    $timeout.flush();
    expect(SectionsCtrl.$scope.$destroy).toHaveBeenCalled();
  });
});
