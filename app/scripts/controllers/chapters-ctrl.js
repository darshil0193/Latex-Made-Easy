'use strict';

/**
 * @ngdoc function
 * @name latexmadeeasyApp.controller:ChaptersCtrl
 * @description
 * # ChaptersCtrl
 * Controller of the latexmadeeasyApp
 */
let ChaptersController = function() {
  // this.numOfChapters = 0;
  this.sectionNumber = 1;

  this.addSection = () => {
    // let chaptersElement = document.getElementById('chapters_div');
    // let sectionElement = document.createElement('section');
    // sectionElement.setAttribute('section', this.chapters.chapters[this.numOfChapters].section);
    // chaptersElement.appendChild(sectionElement);
    // this.$scope.$apply();
    this.sectionNumber++;
    this.chapter.sections.push({
      id: this.sectionNumber,
      data: ''
    });
  }
};

angular.module('latexmadeeasyApp').controller('ChaptersCtrl', ChaptersController);
