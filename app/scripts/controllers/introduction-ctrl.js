'use strict';
/**
 * @ngdoc function
 * @name latexmadeeasyApp.controller:IntroductionCtrl
 * @description
 * # IntroductionCtrl
 * Controller of the latexmadeeasyApp
 */
let IntroductionController = function($mdDialog) {
  this.hideIntro = false;
  this.$mdDialog = $mdDialog;

  this.removeIntroduction = () => {
    let confirm = this.$mdDialog.confirm()
      .title('Removal Confirmation')
      .textContent('Are you sure you want to remove? The data will be lost.')
      .ok('Yes')
      .cancel('No');

    this.$mdDialog.show(confirm).then(() => {
      this.introductionNumber--;
      this.chapter.introduction = '';
    });
  };
};

angular.module('latexmadeeasyApp').controller('IntroductionCtrl', IntroductionController);
