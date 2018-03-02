'use strict';

/**
 * @ngdoc function
 * @name latexmadeeasyApp.controller:SectionCtrl
 * @description
 * # SectionCtrl
 * Controller of the latexmadeeasyApp
 */
let SectionsController = function($mdDialog, $element, $scope) {
  this.$mdDialog = $mdDialog;
  this.$element = $element;
  this.$scope = $scope;
  this.hideSection = false;

  this.removeSection = () => {
    let confirm = this.$mdDialog.confirm()
      .title('Removal Confirmation')
      .textContent('Are you sure you want to remove? The data will be lost.')
      .ok('Yes')
      .cancel('No');

    this.$mdDialog.show(confirm).then(() => {
      this.section.deleted = true;
      this.$element.remove();
      this.$scope.$destroy();
    });
  }
};

angular.module('latexmadeeasyApp').controller('SectionsCtrl', SectionsController);
