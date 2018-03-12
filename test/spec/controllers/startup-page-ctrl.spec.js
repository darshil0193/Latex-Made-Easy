'use strict';
describe('Controller: StartupPageCtrl', function() {

  // load the controller's module
  beforeEach(module('latexmadeeasyApp'));

  let StartupPageCtrl, scope, $rootScope, $mdDialog, $window, $timeout, $q, $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller, _$rootScope_, _$mdDialog_, _$timeout_, _$q_, _$httpBackend_) {
    $rootScope = _$rootScope_;
    scope = $rootScope.$new();
    $mdDialog = _$mdDialog_;
    $window = {
      location: {
        reload: () => {
          return '';
        }
      }
    };
    $timeout = _$timeout_;
    $q = _$q_;
    $httpBackend = _$httpBackend_;
    StartupPageCtrl = $controller('StartupPageCtrl', {
      $scope: scope

      // place here mocked dependencies
    });
  }));

  beforeEach(() => {
    StartupPageCtrl.frontBlockData = {
      title: {
        title: '',
        author: '',
        college: '',
        degree: '',
        date: new Date()
      },
      dedication: {
        dedication: ''
      },
      acknowledge: {
        acknowledge:''
      },
      abstract: {
        abstract: ''
      },
      chapters: {
        chapters: []
      }
    };
  });

  describe('Add Chapter', () => {

    beforeEach(() => {
      StartupPageCtrl.chapterNumber = 0;
    });

    it('should pop up a dialog when addChapter is called', () => {
      spyOn($mdDialog, 'show').and.returnValue($q.when());
      StartupPageCtrl.addChapter();
      expect($mdDialog.show).toHaveBeenCalled();
    });

    it('should add chapter when addChapter is called', () => {
      expect(StartupPageCtrl.chapterNumber).toEqual(0);
      spyOn($mdDialog, 'show').and.callFake(() => {
        let deferred = $q.defer();
        deferred.resolve('Test Chapter');
        return deferred.promise;
      });
      $httpBackend.when('GET', 'views/main.html').respond('');
      StartupPageCtrl.addChapter();
      $timeout.flush();
      expect(StartupPageCtrl.chapterNumber).toEqual(1);
      expect(StartupPageCtrl.frontBlockData.chapters.chapters).toEqual([{
        id: 1,
        name: 'Test Chapter',
        introduction: '',
        deleted: false,
        data: []
      }]);
    });

    it('should add chapter when addChapter is called and chapters array is undefined', () => {
      delete StartupPageCtrl.frontBlockData.chapters;
      expect(StartupPageCtrl.chapterNumber).toEqual(0);
      spyOn($mdDialog, 'show').and.callFake(() => {
        let deferred = $q.defer();
        deferred.resolve('Test Chapter');
        return deferred.promise;
      });
      $httpBackend.when('GET', 'views/main.html').respond('');
      StartupPageCtrl.addChapter();
      $timeout.flush();
      expect(StartupPageCtrl.chapterNumber).toEqual(1);
      expect(StartupPageCtrl.frontBlockData.chapters.chapters).toEqual([{
        id: 1,
        name: 'Test Chapter',
        introduction: '',
        deleted: false,
        data: []
      }]);
    });
  });

  describe('Log Out', () => {
    it('should call getLatex with save flag set to true', () => {
      spyOn(StartupPageCtrl, 'getLatex').and.returnValue('');
      StartupPageCtrl.logOut();
      expect(StartupPageCtrl.getLatex).toHaveBeenCalledWith(true);
    });
  });

  describe('Get Latex', () => {
    it('should call the backend service', () => {
      let data = {
        data: 'test data'
      };
      let headers = {
        'content-disposition': 'attachment; filename="all_files_testuser.zip"'
      };
      $httpBackend.when('GET', 'views/main.html').respond('');
      $httpBackend.when('POST', 'https://latex-made-easy-backend.herokuapp.com/getLatex').respond(data, headers);
      spyOn(StartupPageCtrl.StartupPageFact, 'getLatex').and.callThrough();
      spyOn(StartupPageCtrl.fileSaver, 'saveAs').and.callFake(() => {
        return '';
      });
      StartupPageCtrl.getLatex(false);
      $httpBackend.flush();
      expect(StartupPageCtrl.fileSaver.saveAs).toHaveBeenCalled();
    });

    it('should test the backend failure', () => {
      $httpBackend.when('GET', 'views/main.html').respond('');
      $httpBackend.when('POST', 'https://latex-made-easy-backend.herokuapp.com/getLatex').respond(400, 'some error');
      spyOn(StartupPageCtrl.StartupPageFact, 'getLatex').and.callThrough();
      spyOn(console, 'log');
      StartupPageCtrl.getLatex(false);
      $httpBackend.flush();
      expect(StartupPageCtrl.StartupPageFact.getLatex).toHaveBeenCalled();
      expect(console.log).toHaveBeenCalledWith('some error');
    });
  });

  describe('Save Latex', () => {

    beforeEach(() => {
      StartupPageCtrl.frontBlockData.chapters.chapters = [{
        id: 1,
        name: 'Test Chapter',
        introduction: '',
        deleted: false,
        data: [{
          moduleId: 1,
          id: 1,
          name: 'Test Section',
          type: 'section',
          text: '',
          deleted: true
        }, {
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
        }]
      }];
    });

    it('should call the backend service', () => {
      StartupPageCtrl.frontBlockData.chapters.chapters[0].deleted = true;
      $httpBackend.when('GET', 'views/main.html').respond('');
      $httpBackend.when('POST', 'https://latex-made-easy-backend.herokuapp.com/saveLatex').respond('');
      spyOn(StartupPageCtrl.StartupPageFact, 'saveLatex').and.callThrough();
      spyOn($mdDialog, 'show').and.returnValue($q.when());
      StartupPageCtrl.getLatex(true);
      $httpBackend.flush();
      expect($mdDialog.show).toHaveBeenCalled();
    });

    it('should test the backend failure', () => {
      $httpBackend.when('GET', 'views/main.html').respond('');
      $httpBackend.when('POST', 'https://latex-made-easy-backend.herokuapp.com/saveLatex').respond(400, 'some error');
      spyOn(console, 'log');
      spyOn(StartupPageCtrl.StartupPageFact, 'saveLatex').and.callThrough();
      StartupPageCtrl.getLatex(true);
      $httpBackend.flush();
      expect(StartupPageCtrl.StartupPageFact.saveLatex).toHaveBeenCalled();
      expect(console.log).toHaveBeenCalledWith('some error');
    });
  });
});
