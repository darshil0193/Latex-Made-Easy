'use strict';

/**
 * @ngdoc function
 * @name latexmadeeasyApp.controller:ParagraphCtrl
 * @description
 * # ParagraphCtrl
 * Controller of the latexmadeeasyApp
 */
let ParagraphController = function($mdDialog, $element, $scope) {
  this.$mdDialog = $mdDialog;
  this.$element = $element;
  this.$scope = $scope;
  this.hideParagraph = false;

  this.removeParagraph = () => {
    let confirm = this.$mdDialog.confirm()
      .title('Removal Confirmation')
      .textContent('Are you sure you want to remove? The data will be lost.')
      .ok('Yes')
      .cancel('No');

    this.$mdDialog.show(confirm).then(() => {
      this.paragraph.deleted = true;
      this.$element.remove();
      this.$scope.$destroy();
    });
  };
};

angular.module('latexmadeeasyApp').controller('ParagraphCtrl', ParagraphController);
