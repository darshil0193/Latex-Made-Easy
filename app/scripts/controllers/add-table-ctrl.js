'use strict';

/**
 * @ngdoc function
 * @name latexmadeeasyApp.controller:AddtableCtrl
 * @description
 * # AddtableCtrl
 * Controller of the latexmadeeasyApp
 */
let AddTableController = function($mdDialog) {
  this.$mdDialog = $mdDialog;
  this.gridOptions = {
    enableSorting: false,
    columnDefs: [],
    data: []
  };

  this.addColumn = () => {
    let confirm = this.$mdDialog.prompt()
      .title('Column Name')
      .textContent('Please provide a column name')
      .placeholder('Column Name')
      .initialValue('Column ' + (this.table.columns.length + 1))
      .required(true)
      .ok('Add')
      .cancel('Cancel');

    this.$mdDialog.show(confirm).then((result) => {
      let column = {
        name: result,
        enableCellEdit: true,
      };

      this.table.columns.push(column);
    });
  };

  this.addRow = () => {
    let row = {};
    for(let i=0; i<this.gridOptions.columnDefs.length; ++i) {
      row[this.gridOptions.columnDefs[i].name] = 'Double Click to Edit';
    }

    this.table.rows.push(row);
  }
};

angular.module('latexmadeeasyApp').controller('AddTableCtrl', AddTableController);
