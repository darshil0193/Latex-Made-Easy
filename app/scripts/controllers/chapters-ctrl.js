'use strict';
/**
 * @ngdoc function
 * @name latexmadeeasyApp.controller:ChaptersCtrl
 * @description
 * # ChaptersCtrl
 * Controller of the latexmadeeasyApp
 */
let ChaptersController = function($scope, $element, $compile, $mdDialog) {
  this.sectionNumber = 0;
  this.tableNumber = 0;
  this.introductionNumber = 0;
  this.moduleNumber = 0;
  this.paragraphNumber = 0;
  this.listNumber = 0;
  this.$element = $element;
  this.$compile = $compile;
  this.$scope = $scope;
  this.$mdDialog = $mdDialog;

  this.addSection = (sectionData) => {
    if(_.isEmpty(sectionData)) {
      let confirm = this.$mdDialog.prompt()
        .title('Section Name')
        .textContent('Please provide a section name')
        .placeholder('Section Name')
        .initialValue('New Section')
        .required(true)
        .ok('Add')
        .cancel('Cancel');

      this.$mdDialog.show(confirm).then((result) => {
        this.moduleNumber++;
        this.sectionNumber++;
        if (!this.chapter.data) {
          this.chapter.data = [];
        }

        this.chapter.data.push({
          moduleId: this.moduleNumber,
          id: this.sectionNumber,
          name: result,
          type: 'section',
          text: '',
          deleted: false
        });

        let ele = this.$compile('<sections section="ctrl.chapter.data[' + (this.moduleNumber - 1) + ']"></sections>')(this.$scope);
        this.$element.append(ele);
      });
    } else {
      this.moduleNumber++;
      this.sectionNumber++;
      if (!this.chapter.data) {
        this.chapter.data = [];
      }

      let ele = this.$compile('<sections section="ctrl.chapter.data[' + (this.moduleNumber - 1) + ']"></sections>')(this.$scope);
      this.$element.append(ele);
    }
  };

  this.addParagraph = (paragraphData) => {
    this.moduleNumber++;
    this.paragraphNumber++;
    if (!this.chapter.data) {
      this.chapter.data = [];
    }

    if(_.isEmpty(paragraphData)) {
      this.chapter.data.push({
        moduleId: this.moduleNumber,
        id: this.paragraphNumber,
        type: 'paragraph',
        text: '',
        deleted: false
      });
    }

    let ele = this.$compile('<paragraph paragraph="ctrl.chapter.data[' + (this.moduleNumber - 1) + ']"></paragraph>')(this.$scope);
    this.$element.append(ele);
  };

  this.addList = (listData) => {
    this.moduleNumber++;
    this.listNumber++;
    if (!this.chapter.data) {
      this.chapter.data = [];
    }

    if(_.isEmpty(listData)) {
      this.chapter.data.push({
        moduleId: this.moduleNumber,
        id: this.listNumber,
        type: 'list',
        items: [{
          id: 1,
          text: ''
        }],
        deleted: false,
        ordered: false
      });
    }
    let ele = this.$compile('<add-list list="ctrl.chapter.data[' + (this.moduleNumber - 1) + ']"></add-list>')(this.$scope);
    this.$element.append(ele);
  };

  this.addTable = (tableData) => {
    this.moduleNumber++;
    this.tableNumber++;
    if (!this.chapter.data) {
      this.chapter.data = [];
    }

    if(_.isEmpty(tableData)) {
      this.chapter.data.push({
        moduleId: this.moduleNumber,
        id: this.tableNumber,
        type: 'table',
        caption: 'New Table',
        deleted: false,
        grid: {
          enableColumnMenus: false,
          selectionRowHeaderWidth: 35,
          rowHeight: 35,
          enableSorting: false,
          columnDefs: [],
          data: []
        }
      });
      tableData = _.last(this.chapter.data);
    }

    let ele = this.$compile('<add-table table="ctrl.chapter.data[' + (this.moduleNumber - 1) + ']"></add-table>')(this.$scope);
    this.$element.append(ele);
  };

  this.addIntroduction = () => {
    this.introductionNumber++;
  };

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

  this.removeChapter = () => {
    let confirm = this.$mdDialog.confirm()
      .title('Removal Confirmation')
      .textContent('Are you sure you want to remove? The data will be lost.')
      .ok('Yes')
      .cancel('No');

    this.$mdDialog.show(confirm).then(() => {
      this.chapter.deleted = true;
      this.$element.remove();
      this.$scope.$destroy();
    });
  };
};

angular.module('latexmadeeasyApp').controller('ChaptersCtrl', ChaptersController);
