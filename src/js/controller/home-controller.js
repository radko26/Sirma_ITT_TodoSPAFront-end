define(
  [
    'angular'
  ],
  function(angular) {
    'use strict';

    angular
      .module('todoApp.home-controller', [
        
      ])
      .controller('HomeController', [
        '$scope',
        function($scope) {

          $scope.hello = 'Hello';
          $scope.footer = 'SPA Task Manager';

        }
      ]);
  }
);