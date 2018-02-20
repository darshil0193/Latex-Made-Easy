'use strict';

/**
 * @ngdoc function
 * @name latexmadeeasyApp.controller:StartupPageCtrl
 * @description
 * # StartupPageCtrl
 * Controller of the latexmadeeasyApp
 */

let StartupPageController = function($mdDialog, StartupPageFact) {
  this.$mdDialog = $mdDialog;
  this.StartupPageFact = StartupPageFact;
  this.frontBlockData = {
    title: {
      title: '',
      author: '',
      college: '',
      degree: '',
      date: new Date(),
    },
    acknowledge: {
      acknowledge:''
    },
    abstract: {
      abstract: ''
    }
  };
  this.pageNumber = 1;

  this.getLatex = (frontBlockData) => {
    let requestObject = _.cloneDeep(frontBlockData);
    requestObject.title.date = frontBlockData.title.date.toDateString().substring(4);
    this.StartupPageFact.getLatex(requestObject).then((data) => {
      this.$mdDialog.show(
        this.$mdDialog.alert()
          .parent(angular.element(document.querySelector('#popupContainer')))
          .clickOutsideToClose(true)
          .title('Latex Code')
          .textContent(data.data)
      );
    }).catch((err) => {
      console.log(err.data);
    });
  };
};

angular.module('latexmadeeasyApp').controller('StartupPageCtrl', StartupPageController);
