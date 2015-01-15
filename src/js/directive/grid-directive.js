define(
  ['angular'],
  function(angular) {
    'use strict';

    angular
    .module('todoApp.grid-directive',[])
    .directive('gridDirective', [function() {
     return{
      templateUrl : 'template/grid.html'
    };
  }]);
  }
  );