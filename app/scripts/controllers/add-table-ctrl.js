'use strict';

/**
 * @ngdoc function
 * @name latexmadeeasyApp.controller:AddtableCtrl
 * @description
 * # AddtableCtrl
 * Controller of the latexmadeeasyApp
 */
let AddTableController = function($mdDialog, $element, $scope) {
  this.$mdDialog = $mdDialog;
  this.$element = $element;
  this.$scope = $scope;
  this.isAddCaption = false;
  this.captionAdded = false;
  this.hideGrid = false;

  this.addColumn = () => {
    let confirm = this.$mdDialog.prompt()
      .title('Column Name')
      .textContent('Please provide a column name')
      .placeholder('Column Name')
      .initialValue('Column ' + (this.table.grid.columnDefs.length + 1))
      .required(true)
      .ok('Add')
      .cancel('Cancel');

    this.$mdDialog.show(confirm).then((result) => {
      let column = {
        name: result
      };

      for(let i=0; i<this.table.grid.data.length; ++i) {
        this.table.grid.data[i][column.name] = 'Double Click to Edit';
      }

      this.table.grid.columnDefs.push(column);
    });
  };

  this.addRow = () => {
    let row = {};
    for(let i=0; i<this.table.grid.columnDefs.length; ++i) {
      row[this.table.grid.columnDefs[i].name] = 'Double Click to Edit';
    }

    this.table.grid.data.push(row);
  };

  this.addCaption = () => {
    this.isAddCaption = true;
    this.captionAdded = true;
  };

  this.removeCaption = () => {
    let confirm = this.$mdDialog.confirm()
      .title('Removal Confirmation')
      .textContent('Are you sure you want to remove? The data will be lost.')
      .ok('Yes')
      .cancel('No');

    this.$mdDialog.show(confirm).then(() => {
      this.isAddCaption = false;
      this.captionAdded = false;
      this.table.caption = '';
    });
  };

  this.removeTable = () => {
    let confirm = this.$mdDialog.confirm()
      .title('Removal Confirmation')
      .textContent('Are you sure you want to remove? The data will be lost.')
      .ok('Yes')
      .cancel('No');

    this.$mdDialog.show(confirm).then(() => {
      this.table.deleted = true;
      this.$element.remove();
      this.$scope.$destroy();
    });
  };
};

angular.module('latexmadeeasyApp').controller('AddTableCtrl', AddTableController);
