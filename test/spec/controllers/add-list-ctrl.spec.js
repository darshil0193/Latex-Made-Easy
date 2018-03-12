'use strict';

describe('Controller: AddListCtrl', () => {

  // load the controller's module
  beforeEach(module('latexmadeeasyApp'));

  let AddListCtrl, $q, $mdDialog, $timeout, $httpBackend;
  let scope = {};
  let element = angular.element('<div></div>');

  // Initialize the controller and a mock scope
  beforeEach(inject(($controller, _$rootScope_, _$mdDialog_, _$q_, _$timeout_, _$httpBackend_) => {
    scope = _$rootScope_.$new();
    $q = _$q_;
    $mdDialog = _$mdDialog_;
    $httpBackend = _$httpBackend_;
    $timeout = _$timeout_;
    AddListCtrl = $controller('AddListCtrl', {
      $scope: scope,
      $element: element

      // place here mocked dependencies
    });
  }));

  beforeEach(() => {
    AddListCtrl.list = {
      moduleId: 1,
      id: 1,
      type: 'list',
      items: [{
        id: 1,
        text: ''
      }],
      deleted: false,
      ordered: false
    };

    AddListCtrl.items = AddListCtrl.list.items.length;
  });

  it('should increment items when an item is added', () => {
    expect(AddListCtrl.items).toEqual(1);
    spyOn(AddListCtrl.list.items, 'push');
    AddListCtrl.addItem();
    expect(AddListCtrl.items).toEqual(2);
    expect(AddListCtrl.list.items.push).toHaveBeenCalledWith({
      id: AddListCtrl.items,
      text: ''
    });
  });

  it('should pop up a dialog when user tries to remove an item', () => {
    spyOn($mdDialog, 'show').and.returnValue($q.when());
    AddListCtrl.removeLastItem();
    expect($mdDialog.show).toHaveBeenCalled();
  });

  it('should decrement items when removeLastItem is called', () => {
    expect(AddListCtrl.items).toEqual(1);
    spyOn($mdDialog, 'show').and.returnValue($q.when());
    spyOn(AddListCtrl.list.items, 'pop');
    $httpBackend.when('GET', 'views/main.html').respond('');
    AddListCtrl.removeLastItem();
    $timeout.flush();
    expect(AddListCtrl.items).toEqual(0);
    expect(AddListCtrl.list.items.pop).toHaveBeenCalled();
  });

  it('should pop up a dialog when user tries to remove the list', () => {
    spyOn($mdDialog, 'show').and.returnValue($q.when());
    AddListCtrl.removeList();
    expect($mdDialog.show).toHaveBeenCalled();
  });

  it('should mark the list as deleted', () => {
    spyOn($mdDialog, 'show').and.returnValue($q.when());
    $httpBackend.when('GET', 'views/main.html').respond('');
    AddListCtrl.removeList();
    $timeout.flush();
    expect(AddListCtrl.list.deleted).toBeTruthy();
  });

  it('should remove the element when removeList is called', () => {
    spyOn($mdDialog, 'show').and.returnValue($q.when());
    spyOn(AddListCtrl.$element, 'remove');
    $httpBackend.when('GET', 'views/main.html').respond('');
    AddListCtrl.removeList();
    $timeout.flush();
    expect(AddListCtrl.$element.remove).toHaveBeenCalled();
  });

  it('should destroy the scope of the element when removeList is called', () => {
    spyOn($mdDialog, 'show').and.returnValue($q.when());
    spyOn(AddListCtrl.$scope, '$destroy');
    $httpBackend.when('GET', 'views/main.html').respond('');
    AddListCtrl.removeList();
    $timeout.flush();
    expect(AddListCtrl.$scope.$destroy).toHaveBeenCalled();
  });
});
