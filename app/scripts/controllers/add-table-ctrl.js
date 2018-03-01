'use strict';

/**
 * @ngdoc function
 * @name latexmadeeasyApp.controller:AddtableCtrl
 * @description
 * # AddtableCtrl
 * Controller of the latexmadeeasyApp
 */
let AddTableController = function() {
  this.myData = [{firstName: 'Darshil', lastName: 'Patel'}];
  this.gridOptions = {
    enableSorting: false,
    columnDefs: [
      {name: 'column1', enableCellEdit:true},
      {name: 'column2', enableCellEdit:true},
      {name: 'column3', enableCellEdit:true},
    ],
    data: [
      {column1: 'D1C1', column2: 'D1C2', column3: 'D1C3'},
      {column1: 'D2C1', column2: 'D2C2', column3: 'D2C3'},
      {column1: 'D3C1', column2: 'D3C2', column3: 'D3C3'},
    ]
  }
};

angular.module('latexmadeeasyApp').controller('AddTableCtrl', AddTableController);
