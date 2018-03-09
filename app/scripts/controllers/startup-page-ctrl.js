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
  this.pageNumber = 1;

  let sanitizeRequest = (requestObject) => {
    //Remove deleted chapters
    _.remove(requestObject.chapters.chapters, (data) => {
      return data.deleted;
    });

    _.each(requestObject.chapters.chapters, (chapter) => {
      //Remove deleted sections, tables and paragraphs inside the chapters
      _.remove(chapter.data, (data) => {
        return data.deleted;
      });

      _.each(chapter.data, (module) => {
        if (module.type === 'table') {
          module.grid.columns = _.map(module.grid.columnDefs, (column) => {
            return column.name;
          });

          module.grid.rows = _.map(module.grid.data, (row) => {
            return _.map(module.grid.columnDefs, (column) => {
              return row[column.name];
            });
          });
        }
      });

      // TODO: If the frontend wants to remove the data which is empty
      // examples:
      // 1. Table is added but no columns and no rows
      // 2. Section/Paragraph is added but empty text
      // 3. List is added but all items are empty
      // 4. Items are added to the list but the item does not have any content.
      //Please check the below code, it might be erroneous.

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

  this.getLatex = (isSave) => {
    // let requestObject = _.cloneDeep(frontBlockData);
    let requestObject = this.frontBlockData;
    if (!_.isString(this.frontBlockData.title.date)) {
      requestObject.title.date = this.frontBlockData.title.date.toDateString().substring(4);
    }

    requestObject.currentUser = this.$rootScope.currentUser;
    sanitizeRequest(requestObject);

    // sanitizeRequest(requestObject.title);

    if (isSave) {
      this.StartupPageFact.saveLatex(requestObject).then(() => {
        $mdDialog.show(
          $mdDialog.alert()
            .clickOutsideToClose(true)
            .title('Hurrah!')
            .textContent('Your status was saved successfully')
            .ok('Got it!')
        );
      }).catch((err) => {
        console.log(err.data);
      });
    } else {
      this.StartupPageFact.getLatex(requestObject).then((data) => {
        let blob = new this.blob([data.data]);
        let fileName = data.headers()['content-disposition'].split('"')[1];
        this.fileSaver.saveAs(blob, fileName);
      }).catch((err) => {
        console.log(err.data);
      });
    }
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
      if (_.isUndefined(this.frontBlockData.chapters) || _.isUndefined(this.frontBlockData.chapters.chapters)) {
        _.set(this.frontBlockData, 'chapters.chapters', []);// = [];
      }

      this.frontBlockData.chapters.chapters.push({
        id: this.chapterNumber,
        name: result,
        introduction: '',
        deleted: false,
        data: []
      });
    });
  };

  this.logOut = () => {
    this.$window.location.reload();
  };
};

angular.module('latexmadeeasyApp').controller('StartupPageCtrl', StartupPageController);
