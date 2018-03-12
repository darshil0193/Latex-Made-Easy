'use strict';

/**
 * @ngdoc function
 * @name latexmadeeasyApp.controller:AddlistCtrl
 * @description
 * # AddlistCtrl
 * Controller of the latexmadeeasyApp
 */
let AddListController = function($mdDialog, $element, $scope) {
  this.$mdDialog = $mdDialog;
  this.$element = $element;
  this.$scope = $scope;
  this.hideList = false;

  this.addItem = () => {
    this.items++;
    this.list.items.push({
      id: this.items,
      text: ''
    });
  };

  this.removeLastItem = () => {
    let confirm = this.$mdDialog.confirm()
      .title('Removal Confirmation')
      .textContent('Are you sure you want to remove? The data will be lost.')
      .ok('Yes')
      .cancel('No');

    this.$mdDialog.show(confirm).then(() => {
      this.items--;
      this.list.items.pop();
    });
  };

  this.removeList = () => {
    let confirm = this.$mdDialog.confirm()
      .title('Removal Confirmation')
      .textContent('Are you sure you want to remove? The data will be lost.')
      .ok('Yes')
      .cancel('No');

    this.$mdDialog.show(confirm).then(() => {
      this.list.deleted = true;
      this.$element.remove();
      this.$scope.$destroy();
    });
  };
};

angular.module('latexmadeeasyApp').controller('AddListCtrl', AddListController);
