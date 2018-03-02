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
  this.sectionNumber = 0;
  this.tableNumber = 0;
  this.introductionNumber = 0;

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
  };

  this.addTable = () => {
    this.tableNumber++;
    this.chapter.tables.push({
      id: this.tableNumber,
      columns: [],
      rows: []
    });
  };

  this.addIntroduction = () => {
    this.introductionNumber++;
    this.chapter.introduction = '';
  };
};

angular.module('latexmadeeasyApp').controller('ChaptersCtrl', ChaptersController);
