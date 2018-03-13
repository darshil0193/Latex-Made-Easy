'use strict';
describe('Controller: ChaptersCtrl', function() {

  // load the controller's module
  beforeEach(module('latexmadeeasyApp'));

  let ChaptersCtrl, $q, $mdDialog, $timeout, $httpBackend;
  let scope = {};
  let element = angular.element('<div></div>');

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller, _$rootScope_, _$mdDialog_, _$q_, _$timeout_, _$httpBackend_) {
    scope = _$rootScope_.$new();
    $q = _$q_;
    $mdDialog = _$mdDialog_;
    $httpBackend = _$httpBackend_;
    $timeout = _$timeout_;
    ChaptersCtrl = $controller('ChaptersCtrl', {
      $scope: scope,
      $element: element

      // place here mocked dependencies
    });
  }));

  beforeEach(() => {
    ChaptersCtrl.chapter = {
      id: this.chapterNumber,
      name: 'Test Chapter',
      introduction: '',
      deleted: false,
      data: []
    };

    ChaptersCtrl.moduleNumber = 0;
  });

  describe('Add Section', () => {

    beforeEach(() => {
      ChaptersCtrl.sectionNumber = 0;
    });

    it('should pop up a dialog when addSection is called', () => {
      spyOn($mdDialog, 'show').and.returnValue($q.when());
      ChaptersCtrl.addSection();
      expect($mdDialog.show).toHaveBeenCalled();
    });

    it('should create the data array if it is undefined when addSection is called', () => {
      delete ChaptersCtrl.chapter.data;
      spyOn($mdDialog, 'show').and.callFake(() => {
        let deferred = $q.defer();
        deferred.resolve('Test Section');
        return deferred.promise;
      });
      $httpBackend.when('GET', 'views/sections.html').respond('');
      $httpBackend.when('GET', 'views/main.html').respond('');
      ChaptersCtrl.addSection();
      $timeout.flush();
      expect(ChaptersCtrl.chapter.data).toEqual([{
        moduleId: 1,
        id: 1,
        name: 'Test Section',
        type: 'section',
        text: '',
        deleted: false
      }]);
    });

    it('should add a section when addSection is called', () => {
      expect(ChaptersCtrl.chapter.data).toEqual([]);
      spyOn($mdDialog, 'show').and.callFake(() => {
        let deferred = $q.defer();
        deferred.resolve('Test Section');
        return deferred.promise;
      });
      $httpBackend.when('GET', 'views/sections.html').respond('');
      $httpBackend.when('GET', 'views/main.html').respond('');
      ChaptersCtrl.addSection();
      $timeout.flush();
      expect(ChaptersCtrl.chapter.data).toEqual([{
        moduleId: 1,
        id: 1,
        name: 'Test Section',
        type: 'section',
        text: '',
        deleted: false
      }]);
    });

    it('should update section data if it is already present when addSection is called', () => {
      let sectionData = {
        moduleId: this.moduleNumber,
        id: this.sectionNumber,
        name: 'Test Section',
        type: 'section',
        text: '',
        deleted: false
      };
      ChaptersCtrl.addSection(sectionData);
      expect(ChaptersCtrl.moduleNumber).toEqual(1);
      expect(ChaptersCtrl.sectionNumber).toEqual(1);
    });

    it('should create data array if it is not already present and sectionData is provided when addSection is called', () => {
      delete ChaptersCtrl.chapter.data;
      let sectionData = {
        moduleId: this.moduleNumber,
        id: this.sectionNumber,
        name: 'Test Section',
        type: 'section',
        text: '',
        deleted: false
      };
      ChaptersCtrl.addSection(sectionData);
      expect(ChaptersCtrl.moduleNumber).toEqual(1);
      expect(ChaptersCtrl.sectionNumber).toEqual(1);
    });
  });

  describe('Add Paragraph', () => {

    beforeEach(() => {
      ChaptersCtrl.paragraphNumber = 0;
    });

    it('should add a paragraph when addParagraph is called', () => {
      expect(ChaptersCtrl.chapter.data).toEqual([]);
      ChaptersCtrl.addParagraph();
      expect(ChaptersCtrl.chapter.data).toEqual([{
        moduleId: 1,
        id: 1,
        type: 'paragraph',
        text: '',
        deleted: false
      }]);
    });

    it('should add data array if it is undefined when addParagraph is called', () => {
      delete ChaptersCtrl.chapter.data;
      ChaptersCtrl.addParagraph();
      expect(ChaptersCtrl.chapter.data).toEqual([{
        moduleId: 1,
        id: 1,
        type: 'paragraph',
        text: '',
        deleted: false
      }]);
    });

    it('should add data array if it is undefined and paragraph data is provided when addParagraph is called', () => {
      let paragraphData = {
        moduleId: 1,
        id: 1,
        type: 'paragraph',
        text: '',
        deleted: false
      };
      delete ChaptersCtrl.chapter.data;
      ChaptersCtrl.addParagraph(paragraphData);
      expect(ChaptersCtrl.paragraphNumber).toEqual(1);
      expect(ChaptersCtrl.moduleNumber).toEqual(1);
    });

    it('should add paragraph if paragraph data is provided when addParagraph is called', () => {
      let paragraphData = {
        moduleId: 1,
        id: 1,
        type: 'paragraph',
        text: '',
        deleted: false
      };
      ChaptersCtrl.addParagraph(paragraphData);
      expect(ChaptersCtrl.paragraphNumber).toEqual(1);
      expect(ChaptersCtrl.moduleNumber).toEqual(1);
    });
  });

  describe('Add List', () => {

    beforeEach(() => {
      ChaptersCtrl.listNumber = 0;
    });

    it('should add a list when addList is called', () => {
      expect(ChaptersCtrl.chapter.data).toEqual([]);
      ChaptersCtrl.addList();
      expect(ChaptersCtrl.chapter.data).toEqual([{
        moduleId: 1,
        id: 1,
        type: 'list',
        items: [{
          id: 1,
          text: ''
        }],
        deleted: false,
        ordered: false
      }]);
    });

    it('should add data array if it is undefined when addList is called', () => {
      delete ChaptersCtrl.chapter.data;
      ChaptersCtrl.addList();
      expect(ChaptersCtrl.chapter.data).toEqual([{
        moduleId: 1,
        id: 1,
        type: 'list',
        items: [{
          id: 1,
          text: ''
        }],
        deleted: false,
        ordered: false
      }]);
    });

    it('should add data array if it is undefined and list data is provided when addList is called', () => {
      let listData = {
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
      delete ChaptersCtrl.chapter.data;
      ChaptersCtrl.addList(listData);
      expect(ChaptersCtrl.listNumber).toEqual(1);
      expect(ChaptersCtrl.moduleNumber).toEqual(1);
    });

    it('should add list if list data is provided when addList is called', () => {
      let listData = {
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
      ChaptersCtrl.addList(listData);
      expect(ChaptersCtrl.listNumber).toEqual(1);
      expect(ChaptersCtrl.moduleNumber).toEqual(1);
    });
  });

  describe('Add Introduction', () => {
    it('should increment introductionNumber', () => {
      ChaptersCtrl.introductionNumber = 0;
      ChaptersCtrl.addIntroduction();
      expect(ChaptersCtrl.introductionNumber).toEqual(1);
    });
  });

  describe('Remove Chapter', () => {
    it('should pop up a dialog when removeChapter is called', () => {
      spyOn($mdDialog, 'show').and.returnValue($q.when());
      ChaptersCtrl.removeChapter();
      expect($mdDialog.show).toHaveBeenCalled();
    });

    it('should mark the chapter as deleted when removeChapter is called', () => {
      expect(ChaptersCtrl.chapter.deleted).toBeFalsy();
      spyOn($mdDialog, 'show').and.returnValue($q.when());
      $httpBackend.when('GET', 'views/main.html').respond('');
      ChaptersCtrl.removeChapter();
      $timeout.flush();
      expect(ChaptersCtrl.chapter.deleted).toBeTruthy();
    });

    it('should remove the element when removeChapter is called', () => {
      spyOn($mdDialog, 'show').and.returnValue($q.when());
      spyOn(ChaptersCtrl.$element, 'remove');
      $httpBackend.when('GET', 'views/main.html').respond('');
      ChaptersCtrl.removeChapter();
      $timeout.flush();
      expect(ChaptersCtrl.$element.remove).toHaveBeenCalled();
    });

    it('should destroy the scope of the element when removeChapter is called', () => {
      spyOn($mdDialog, 'show').and.returnValue($q.when());
      spyOn(ChaptersCtrl.$scope, '$destroy');
      $httpBackend.when('GET', 'views/main.html').respond('');
      ChaptersCtrl.removeChapter();
      $timeout.flush();
      expect(ChaptersCtrl.$scope.$destroy).toHaveBeenCalled();
    });
  });

  describe('Add Table', () => {

    beforeEach(() => {
      ChaptersCtrl.tableNumber = 0;
    });

    it('should add a table when addTable is called', () => {
      expect(ChaptersCtrl.chapter.data).toEqual([]);
      ChaptersCtrl.addTable();
      expect(ChaptersCtrl.chapter.data).toEqual([{
        moduleId: 1,
        id: 1,
        type: 'table',
        caption: '',
        deleted: false,
        grid: {
          enableColumnMenus: false,
          selectionRowHeaderWidth: 35,
          rowHeight: 35,
          enableSorting: false,
          columnDefs: [],
          data: []
        }
      }]);
    });

    it('should add data array if it is undefined when addTable is called', () => {
      delete ChaptersCtrl.chapter.data;
      ChaptersCtrl.addTable();
      expect(ChaptersCtrl.chapter.data).toEqual([{
        moduleId: 1,
        id: 1,
        type: 'table',
        caption: '',
        deleted: false,
        grid: {
          enableColumnMenus: false,
          selectionRowHeaderWidth: 35,
          rowHeight: 35,
          enableSorting: false,
          columnDefs: [],
          data: []
        }
      }]);
    });

    it('should add data array if it is undefined and table data is provided when addTable is called', () => {
      let tableData = {
        moduleId: 1,
        id: 1,
        type: 'table',
        caption: '',
        deleted: false,
        grid: {
          enableColumnMenus: false,
          selectionRowHeaderWidth: 35,
          rowHeight: 35,
          enableSorting: false,
          columnDefs: [],
          data: []
        }
      };
      delete ChaptersCtrl.chapter.data;
      ChaptersCtrl.addTable(tableData);
      expect(ChaptersCtrl.tableNumber).toEqual(1);
      expect(ChaptersCtrl.moduleNumber).toEqual(1);
    });

    it('should add table if table data is provided when addTable is called', () => {
      let tableData = {
        moduleId: 1,
        id: 1,
        type: 'table',
        caption: '',
        deleted: false,
        grid: {
          enableColumnMenus: false,
          selectionRowHeaderWidth: 35,
          rowHeight: 35,
          enableSorting: false,
          columnDefs: [],
          data: []
        }
      };
      ChaptersCtrl.addTable(tableData);
      expect(ChaptersCtrl.tableNumber).toEqual(1);
      expect(ChaptersCtrl.moduleNumber).toEqual(1);
    });
  });
});
