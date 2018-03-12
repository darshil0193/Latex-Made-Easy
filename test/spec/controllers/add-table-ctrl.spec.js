'use strict';
describe('Controller: AddtableCtrl', function() {

  // load the controller's module
  beforeEach(module('latexmadeeasyApp'));

  let AddTableCtrl, $mdDialog, $q, $timeout, $httpBackend;
  let scope = {};
  let element = angular.element('<div></div>');

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller, _$rootScope_, _$mdDialog_, _$q_, _$timeout_, _$httpBackend_) {
    scope = _$rootScope_.$new();
    $mdDialog = _$mdDialog_;
    $q = _$q_;
    $timeout = _$timeout_;
    $httpBackend = _$httpBackend_;
    AddTableCtrl = $controller('AddTableCtrl', {
      $scope: scope,
      $element: element

      // place here mocked dependencies
    });
  }));

  beforeEach(() => {
    AddTableCtrl.table = {
      moduleId: this.moduleNumber,
      id: this.tableNumber,
      type: 'table',
      caption: '',
      deleted: false,
      grid: {
        enableColumnMenus: false,
        selectionRowHeaderWidth: 35,
        rowHeight: 35,
        enableSorting: false,
        columnDefs: [{name: 'Column 1'}],
        data: [{'Column 1': 'Something in row 1 column 1'}]
      }
    };
    AddTableCtrl.isAddCaption = false;
    AddTableCtrl.captionAdded = false;
  });

  it('should pop up a dialog to ask the column name when addColumn is called', function() {
    spyOn($mdDialog, 'show').and.returnValue($q.when());
    AddTableCtrl.addColumn();
    expect($mdDialog.show).toHaveBeenCalled();
  });

  it('should add a column to ColumnDefs when addColumn is called', () => {
    expect(AddTableCtrl.table.grid.columnDefs).toEqual([{
      name: 'Column 1'
    }]);
    spyOn($mdDialog, 'show').and.callFake(() => {
      let deferred = $q.defer();
      deferred.resolve('Test Column');
      return deferred.promise;
    });
    $httpBackend.when('GET', 'views/main.html').respond('');
    AddTableCtrl.addColumn();
    $timeout.flush();
    expect(AddTableCtrl.table.grid.columnDefs).toEqual([{
      name: 'Column 1'
    }, {
      name: 'Test Column'
    }]);
  });

  it('should add row data when addRow is called', () => {
    AddTableCtrl.table.grid.columnDefs.push({
      name: 'Test Column'
    });
    AddTableCtrl.addRow();
    expect(AddTableCtrl.table.grid.data).toEqual([{
      'Column 1': 'Something in row 1 column 1'
    }, {
      'Column 1': 'Double Click to Edit',
      'Test Column': 'Double Click to Edit'
    }]);
  });

  it('should mark the flags true when caption is added', () => {
    expect(AddTableCtrl.isAddCaption).toBeFalsy();
    expect(AddTableCtrl.captionAdded).toBeFalsy();
    AddTableCtrl.addCaption();
    expect(AddTableCtrl.isAddCaption).toBeTruthy();
    expect(AddTableCtrl.captionAdded).toBeTruthy();
  });

  it('should pop up a dialog when removeCaption is called', () => {
    spyOn($mdDialog, 'show').and.returnValue($q.when());
    AddTableCtrl.removeCaption();
    expect($mdDialog.show).toHaveBeenCalled();
  });

  it('should mark the flags false when removeCaption is called', () => {
    AddTableCtrl.isAddCaption = true;
    AddTableCtrl.captionAdded = true;
    AddTableCtrl.table.caption = 'Test Caption';
    expect(AddTableCtrl.isAddCaption).toBeTruthy();
    expect(AddTableCtrl.captionAdded).toBeTruthy();
    spyOn($mdDialog, 'show').and.returnValue($q.when());
    $httpBackend.when('GET', 'views/main.html').respond('');
    AddTableCtrl.removeCaption();
    $timeout.flush();
    expect(AddTableCtrl.isAddCaption).toBeFalsy();
    expect(AddTableCtrl.captionAdded).toBeFalsy();
    expect(AddTableCtrl.table.caption).toEqual('');
  });

  it('should pop up a dialog when removeTable is called', () => {
    spyOn($mdDialog, 'show').and.returnValue($q.when());
    AddTableCtrl.removeTable();
    expect($mdDialog.show).toHaveBeenCalled();
  });

  it('should mark the table deleted when removeTable is called', () => {
    expect(AddTableCtrl.table.deleted).toBeFalsy();
    spyOn($mdDialog, 'show').and.returnValue($q.when());
    $httpBackend.when('GET', 'views/main.html').respond('');
    AddTableCtrl.removeTable();
    $timeout.flush();
    expect(AddTableCtrl.table.deleted).toBeTruthy();
  });

  it('should remove the element when removeTable is called', () => {
    spyOn($mdDialog, 'show').and.returnValue($q.when());
    spyOn(AddTableCtrl.$element, 'remove');
    $httpBackend.when('GET', 'views/main.html').respond('');
    AddTableCtrl.removeTable();
    $timeout.flush();
    expect(AddTableCtrl.$element.remove).toHaveBeenCalled();
  });

  it('should destroy the scope of the element when removeTable is called', () => {
    spyOn($mdDialog, 'show').and.returnValue($q.when());
    spyOn(AddTableCtrl.$scope, '$destroy');
    $httpBackend.when('GET', 'views/main.html').respond('');
    AddTableCtrl.removeTable();
    $timeout.flush();
    expect(AddTableCtrl.$scope.$destroy).toHaveBeenCalled();
  });
});
