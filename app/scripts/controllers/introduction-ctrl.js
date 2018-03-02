'use strict';

/**
 * @ngdoc function
 * @name latexmadeeasyApp.controller:IntroductionCtrl
 * @description
 * # IntroductionCtrl
 * Controller of the latexmadeeasyApp
 */
let IntroductionController = function() {
  this.hideIntro = false;
};

angular.module('latexmadeeasyApp').controller('IntroductionCtrl', IntroductionController);
