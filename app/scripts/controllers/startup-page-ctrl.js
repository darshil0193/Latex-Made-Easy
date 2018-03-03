'use strict';

/**
 * @ngdoc function
 * @name latexmadeeasyApp.controller:StartupPageCtrl
 * @description
 * # StartupPageCtrl
 * Controller of the latexmadeeasyApp
 */

let StartupPageController = function($mdDialog, $rootScope, $window, StartupPageFact, FileSaver, Blob) {
  this.fileSaver = FileSaver;
  this.blob = Blob;
  this.$rootScope = $rootScope;
  this.$mdDialog = $mdDialog;
  this.$window = $window;
  this.StartupPageFact = StartupPageFact;
  this.chapterNumber = 0;
  this.frontBlockData = {
    title: {
      title: '',
      author: '',
      college: '',
      degree: '',
      date: new Date(),
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
  this.pageNumber = 1;

  // let removeEmptyAttributes = (requestObject) => {
  //   _.each(_.keys(requestObject), (key) => {
  //     if(!_.isString(requestObject[key]) && _.keys(requestObject[key]).length > 0) {
  //       removeEmptyAttributes(requestObject[key]);
  //     } else {
  //       if(!_.isNumber(requestObject[key]) && _.isEmpty(requestObject[key]) || key === '$$hashKey') {
  //         delete(requestObject[key]);
  //       }
  //     }
  //   });
  // };

  let sanitizeRequest = (requestObject) => {
    //Remove deleted chapters
    _.remove(requestObject.chapters.chapters, (data) => {
      return data.deleted;
    });

    _.each(requestObject.chapters.chapters, (chapter) => {
      //Remove deleted sections and tables inside the chapters
      _.remove(chapter.data, (data) => {
        return data.deleted;
      });

      _.each(chapter.data, (module) => {
        if(module.type === 'table') {
          module.grid.columns = _.map(module.grid.columnDefs, (column) => {
            return column.name;
          });

          module.grid.rows = _.map(module.grid.data, (row) => {
            // let rowData = [];
            return _.map(module.grid.columnDefs, (column) => {
              return row[column.name];
            });
            // return rowData;
          });
        }
      });

  //     //Remove empty columns and rows from table
  //     _.each(chapter.data, (module) => {
  //       if(module.type === 'table') {
  //         //Remove empty rows from table
  //         _.remove(module.grid.data, (row) => {
  //           let columns = _.map(module.grid.columnDefs, (column) => {
  //             return column.name;
  //           });
  //           let deleteRow = true;
  //           _.each(columns, (column) => {
  //             if(!_.isEmpty(row[column])) {
  //               deleteRow = false;
  //             }
  //           });
  //           return deleteRow;
  //         });
  //
  //         //Remove empty columns from table
  //         _.remove(module.grid.columnDefs, (column) => {
  //           let deleteColumn = true;
  //           _.each(module.grid.data, (row) => {
  //             if(!_.isEmpty(row[column.name])) {
  //               deleteColumn = false;
  //             }
  //           });
  //
  //           if(deleteColumn) {
  //             _.each(module.grid.data, (row) => {
  //               delete(row[column.name]);
  //             });
  //           }
  //           return deleteColumn;
  //         });
  //       }
  //     });
    });
  //
  //   removeEmptyAttributes(requestObject);
  };

  this.getLatex = (frontBlockData) => {
    // let requestObject = _.cloneDeep(frontBlockData);
    let requestObject = frontBlockData;
    if(!_.isString(frontBlockData.title.date)) {
      requestObject.title.date = frontBlockData.title.date.toDateString().substring(4);
    }
    requestObject.currentUser = this.$rootScope.currentUser;
    sanitizeRequest(requestObject);
    // sanitizeRequest(requestObject.title);

    this.StartupPageFact.getLatex(requestObject).then((data) => {
      let blob = new this.blob([data.data]);
      let fileName = data.headers()["content-disposition"].split("\"")[1];
      this.fileSaver.saveAs(blob, fileName);
    }).catch((err) => {
      console.log(err.data);
    });
  };

  this.addChapter = () => {
    let confirm = this.$mdDialog.prompt()
      .title('Chapter Name')
      .textContent('Please provide a chapter name')
      .placeholder('Chapter Name')
      .initialValue('New Chapter')
      .required(true)
      .ok('Add')
      .cancel('Cancel');

    this.$mdDialog.show(confirm).then((result) => {
      this.chapterNumber++;
      if(!this.frontBlockData.chapters.chapters) {
        this.frontBlockData.chapters.chapters = [];
      }
      this.frontBlockData.chapters.chapters.push({
        id: this.chapterNumber,
        name: result,
        introduction: '',
        deleted: false,
        data: [],
      });
    });
  };

  this.logOut = () => {
    this.$window.location.reload();
  };
};

angular.module('latexmadeeasyApp').controller('StartupPageCtrl', StartupPageController);
